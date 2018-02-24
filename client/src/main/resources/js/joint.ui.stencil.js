!function (joint, b) {
    var c = {
        options: function () {
            return {
                columnWidth: this.options.width / 2 - 10,
                columns: 2,
                rowHeight: 80,
                resizeToFit: !0,
                dy: 10,
                dx: 10
            }
        },
        layoutGroup: function (c, d) {
            var e = this.options.layout;
            if (d = d || {}, !joint.layout.GridLayout) throw new Error("joint.ui.Stencil: joint.layout.GridLayout is not available.");
            joint.layout.GridLayout.layout(c, b.extend({}, e, d.layout))
        }
    };
    joint.ui.Stencil = joint.mvc.View.extend({
        className: "stencil",
        events: {
            "click .btn-expand": "openGroups",
            "click .btn-collapse": "closeGroups",
            "click .groups-toggle .group-label": "openGroups",
            "click .group-label": "onGroupLabelClick",
            "touchstart .group-label": "onGroupLabelClick",
            "input .search": "onSearch",
            "focusin .search": "pointerFocusIn",
            "focusout .search": "pointerFocusOut"
        },
        options: {
            width: 200,
            height: 800,
            label: "Stencil",
            groups: null,
            groupsToggleButtons: !1,
            dropAnimation: !1,
            search: null,
            layout: null,
            snaplines: null,
            scaleClones: !1,
            dragStartClone: function (cell) {
                return cell.clone()
            },
            draggingDone: function (cell) {
                return cell.clone();
            },
            dragEndClone: function (cell) {
                return cell.clone()
            },
            layoutGroup: null
        },
        init: function () {
            this.setPaper(this.options.paperScroller || this.options.paper)
            this.graphs = {};
            this.papers = {};
            this.$groups = {};
            b.bindAll(this, "onDrag", "onDragEnd", "onDropEnd");
            $(document.body).on("mousemove.stencil touchmove.stencil", this.onDrag);
            $(window).on("mouseup.stencil touchend.stencil", this.onDragEnd);
            this.onSearch = b.debounce(this.onSearch, 200);
            this.initializeLayout();
        },
        initializeLayout: function () {
            var a = this.options.layout;
            a && (b.isFunction(a) ? this.layoutGroup = a : (this.layoutGroup = b.bind(c.layoutGroup, this), this.options.layout = b.isObject(a) ? a : {}, b.defaults(this.options.layout, c.options.call(this))))
        },

        setPaper: function (paperInstance) {
            var c = this.options;
            if (paperInstance instanceof joint.dia.Paper) c.paperScroller = null, c.paper = paperInstance, c.graph = paperInstance.model;
            else {
                if (!("function" == typeof joint.ui.PaperScroller && paperInstance instanceof joint.ui.PaperScroller)) throw new Error("Stencil: paper required");
                c.paperScroller = paperInstance, c.paper = paperInstance.options.paper, c.graph = paperInstance.options.paper.model
            }
        },
        renderContent: function () {
            return $("<div/>").addClass("content")
        },
        renderPaperDrag: function () {
            return $("<div/>").addClass("stencil-paper-drag")
        },
        renderSearch: function () {
            return $("<div/>").addClass("search-wrap").append($("<input/>", {
                type: "search",
                placeholder: "search"
            }).addClass("search"))
        },
        renderToggleAll: function () {
            return [$("<div/>").addClass("groups-toggle").append($("<label/>").addClass("group-label").html(this.options.label)).append($("<button/>", {
                text: "+"
            }).addClass("btn btn-expand")).append($("<button/>", {
                text: "-"
            }).addClass("btn btn-collapse"))]
        },
        renderElementsContainer: function () {
            return $("<div/>").addClass("elements")
        },
        renderGroup: function (a) {
            a = a || {};
            var b = $("<div/>").addClass("group").attr("data-name", a.name).toggleClass("closed", !!a.closed),
                c = $("<h3/>").addClass("group-label").html(a.label || a.name),
                d = this.renderElementsContainer();
            return b.append(c, d)
        },
        render: function () {
            this.$content = this.renderContent();
            this.$paperDrag = this.renderPaperDrag();
            this.$el.empty().append(this.$paperDrag, this.$content);
            this.options.search && this.$el.addClass("searchable").prepend(this.renderSearch());
            this.options.groupsToggleButtons && this.$el.addClass("collapsible").prepend(this.renderToggleAll());
            var c = {
                width: this.options.width,
                height: this.options.height,
                interactive: !1
            };
            if (this.options.groups) {
                var d = b.sortBy(b.pairs(this.options.groups), function (a) {
                    return a[1].index
                });
                b.each(d, function (d) {
                    var e = d[0],
                        f = d[1],
                        g = this.$groups[e] = this.renderGroup({
                            name: e,
                            label: f.label,
                            closed: f.closed
                        }).appendTo(this.$content),
                        graph = new joint.dia.Graph,
                        paper = new joint.dia.Paper(b.extend({}, c, {
                            el: g.find(".elements"),
                            model: graph,
                            width: f.width || c.width,
                            height: f.height || c.height
                        }));
                    this.graphs[e] = graph;
                    this.papers[e] = paper;
                }, this)
            } else {
                var e = this.renderElementsContainer().appendTo(this.$content),
                    f = new joint.dia.Graph,
                    g = new joint.dia.Paper(b.extend(c, {
                        el: e,
                        model: f
                    }));
                this.graphs.__default__ = f, this.papers.__default__ = g
            }
            return this._graphDrag = new joint.dia.Graph, this._paperDrag = new joint.dia.Paper({
                el: this.$paperDrag,
                width: 1,
                height: 1,
                model: this._graphDrag
            }), this.startListening(), this
        },
        startListening: function () {
            this.stopListening(), b.each(this.papers, b.bind(this.listenTo, this, b, "cell:pointerdown", this.onDragStart))
        },
        load: function (shapesObj, c) {
            b.isArray(shapesObj) ? this.loadGroup(shapesObj, c) : b.isObject(shapesObj) && b.each(this.options.groups, function (values, key) {
                shapesObj[key] && this.loadGroup(shapesObj[key], key)
            }, this)
        },
        loadGroup: function (typeOfCells, key) {
            var graph = this.getGraph(key);
            graph.resetCells(typeOfCells);
            var d = this.options.height;
            key && (d = this.getGroup(key).height);
            this.isLayoutEnabled() && this.layoutGroup(graph, this.getGroup(key)), d || this.getPaper(key).fitToContent({
                gridWidth: 1,
                gridHeight: 1,
                padding: this.options.paperPadding || 10
            })
        },
        isLayoutEnabled: function () {
            return !!this.options.layout
        },
        getGraph: function (typeOfCell) {
            var b = this.graphs[typeOfCell || "__default__"];
            if (!b) throw new Error("Stencil: group " + typeOfCell + " does not exist.");
            return b
        },
        getPaper: function (a) {
            return this.papers[a || "__default__"]
        },
        preparePaperForDragging: function (a, b, c) {
            var d = this._paperDrag,
                e = this._graphDrag;
            d.$el.addClass("dragging").appendTo(document.body);
            var f = this.options.dragStartClone(a.model).position(0, 0),
                g = f.getBBox(),
                h = 5,
                i = this.options.snaplines;
            if (i && (h += i.options.distance), i || this.options.scaleClones) {
                var j = this.options.paper.scale();
                d.scale(j.sx, j.sy), h *= Math.max(j.sx, j.sy)
            } else d.scale(1, 1);
            this.clearClone(), this.options.dropAnimation && this._paperDrag.$el.stop(!0, !0), e.resetCells([f.position(0, 0)]);
            var k = f.findView(d);
            k.stopListening(), d.fitToContent({
                padding: h,
                allowNewOrigin: "any"
            });
            var l = a.getBBox(),
                m = a.model.getBBox();
            this._cellViewDeltaOrigin = {
                x: m.x - l.x - l.width / 2,
                y: m.y - l.y - l.height / 2
            }, this._clone = f, this._cloneBBox = g, this._cloneView = k, this._cloneViewBBox = k.getBBox(), this._paperDragInitialOffset = this.setPaperDragOffset(b, c), this._paperDragPadding = h
        },
        setPaperDragOffset: function (a, b) {
            var c = document.body.scrollTop || document.documentElement.scrollTop,
                d = this._cloneViewBBox,
                e = this._paperDragPadding,
                f = {
                    left: a - d.width / 2 - e,
                    top: b - d.height / 2 + c - e
                };
            return this._paperDrag.$el.offset(f), f
        },
        setCloneLocalPosition: function (a, b) {
            var c = this.options.paper.clientToLocalPoint({
                x: a,
                y: b
            });
            return c.x -= this._cloneBBox.width / 2, c.y -= this._cloneBBox.height / 2, this._clone.set("position", c), c
        },
        onDragStart: function (a, c) {
            c.preventDefault();
            this.options.graph.startBatch("stencil-drag");
            this.$el.addClass("dragging");
            this.preparePaperForDragging(a, c.clientX, c.clientY);
            var d = this.setCloneLocalPosition(c.clientX, c.clientY),
                e = this._cloneView,
                f = this.options.snaplines;
            f && (f.captureCursorOffset(this._cloneView, c, d.x, d.y), e.listenTo(this._clone, "change:position", b.bind(this.onCloneSnapped, this)))
        },
        onCloneSnapped: function (a, b, c) {
            if (c.snapped) {
                var d = this._cloneBBox;
                a.position(d.x + c.tx, d.y + c.ty, {
                    silent: !0
                }), this._cloneView.translate(), a.set("position", b, {
                    silent: !0
                }), this._cloneSnapOffset = {
                    x: c.tx,
                    y: c.ty
                }
            } else this._cloneSnapOffset = null
        },
        onDrag: function (b) {
            var c = this._cloneView;
            if (c) {
                b.preventDefault(), b = joint.util.normalizeEvent(b);
                var d = b.clientX,
                    e = b.clientY;
                this.setPaperDragOffset(d, e);
                var f = this.setCloneLocalPosition(d, e),
                    g = this.options.paper.options.embeddingMode,
                    h = this.options.snaplines,
                    i = (g || h) && this.insideValidArea({
                        x: d,
                        y: e
                    });
                g && (i ? c.processEmbedding({
                    paper: this.options.paper
                }) : c.clearEmbedding()), h && (i ? h.snapWhileMoving(c, b, f.x, f.y) : h.hide())
            }
        },
        onDragEnd: function (b) {
            var c = this._clone;
            if (c) {
                b = joint.util.normalizeEvent(b);
                var d = this._cloneView,
                    e = this._cloneBBox,
                    f = this._cloneSnapOffset,
                    g = e.x,
                    h = e.y;
                f && (g += f.x, h += f.y), c.position(g, h, {
                    silent: !0
                });
                var i = this.options.dragEndClone(c),
                    j = this.drop(b, i);
                j ? this.onDropEnd(c) : this.onDropInvalid(b, i), this.options.paper.options.embeddingMode && d && d.finalizeEmbedding({
                    model: i,
                    paper: this.options.paper
                }), this.options.graph.stopBatch("stencil-drag")
            }
        },
        onDropEnd: function (a) {
            this._clone === a && (this.clearClone(), this.$el.append(this._paperDrag.$el), this.$el.removeClass("dragging"), this._paperDrag.$el.removeClass("dragging"))
        },
        clearClone: function () {
            this._clone && (this._clone.remove(), this._clone = null, this._cloneView = null, this._cloneSnapOffset = null, this._paperDragInitialOffset = null, this._paperDragPadding = null)
        },
        onDropInvalid: function (c, d) {
            var e = this._clone;
            if (e) {
                c = joint.util.normalizeEvent(c), d = d || this.options.dragEndClone(e), this.trigger("drop:invalid", c, d);
                var f = this.options.dropAnimation;
                if (f) {
                    var g = b.isObject(f) ? f.duration : 150,
                        h = b.isObject(f) ? f.easing : "swing";
                    this._cloneView = null, this._paperDrag.$el.animate(this._paperDragInitialOffset, g, h, b.partial(this.onDropEnd, e))
                } else this.onDropEnd(e)
            }
        },
        insideValidArea: function (a) {
            var b, c = this.options.paper,
                d = this.options.paperScroller,
                e = this.getDropArea(this.$el);
            if (d)
                if (d.options.autoResizePaper) b = this.getDropArea(d.$el);
                else {
                    var f = this.getDropArea(d.$el),
                        g = this.getDropArea(c.$el);
                    b = g.intersect(f)
                } else b = this.getDropArea(c.$el);
            return !(!b || !b.containsPoint(a) || e.containsPoint(a))
        },
        getDropArea: function (a) {
            var b = a.offset(),
                c = document.body.scrollTop || document.documentElement.scrollTop,
                d = document.body.scrollLeft || document.documentElement.scrollLeft;
            return g.rect({
                x: b.left + parseInt(a.css("border-left-width"), 10) - d,
                y: b.top + parseInt(a.css("border-top-width"), 10) - c,
                width: a.innerWidth(),
                height: a.innerHeight()
            })
        },
        drop: function (event, cell) {
            var paper = this.options.paper,
                graph = this.options.graph,
                e = {
                    x: event.clientX,
                    y: event.clientY
                };
            if (this.insideValidArea(e)) {
                var f = paper.clientToLocalPoint(e),
                    h = cell.getBBox();
                f.x += h.x + this._cellViewDeltaOrigin.x, f.y += h.y + this._cellViewDeltaOrigin.y;
                var i = this._cloneSnapOffset ? 1 : paper.options.gridSize;
                return cell.set("position", {
                    x: g.snapToGrid(f.x, i),
                    y: g.snapToGrid(f.y, i)
                }), cell.unset("z"), graph.addCell(cell, {
                    stencil: this.cid
                }), this.options.draggingDone(cell), !0
            }
            return !1
        },
        filter: function (c, d) {
            var e = c.toLowerCase() == c,
                f = b.reduce(this.papers, function (f, g, h) {
                    var i = g.model.get("cells").filter(function (f) {
                            var h = g.findViewByModel(f),
                                i = !c || b.some(d, function (d, g) {
                                    if ("*" != g && f.get("type") != g) return !1;
                                    var h = b.some(d, function (d) {
                                        var g = joint.util.getByPath(f.attributes, d, "/");
                                        return !b.isUndefined(g) && !b.isNull(g) && (g = g.toString(), e && (g = g.toLowerCase()), g.indexOf(c) >= 0)
                                    });
                                    return h
                                });
                            return V(h.el).toggleClass("unmatched", !i), i
                        }, this),
                        j = !b.isEmpty(i),
                        k = (new joint.dia.Graph).resetCells(i);
                    return this.trigger("filter", k, h, c), this.isLayoutEnabled() && this.layoutGroup(k, this.getGroup(h)), this.$groups[h] && this.$groups[h].toggleClass("unmatched", !j), g.fitToContent({
                        gridWidth: 1,
                        gridHeight: 1,
                        padding: this.options.paperPadding || 10
                    }), f || j
                }, !1, this);
            this.$el.toggleClass("not-found", !f)
        },
        getGroup: function (a) {
            return this.options.groups && this.options.groups[a] || {}
        },
        onSearch: function (a) {
            this.filter(a.target.value, this.options.search)
        },
        pointerFocusIn: function () {
            this.$el.addClass("is-focused")
        },
        pointerFocusOut: function () {
            this.$el.removeClass("is-focused")
        },
        onGroupLabelClick: function (a) {
            a.preventDefault();
            var b = $(a.target).closest(".group");
            this.toggleGroup(b.data("name"))
        },
        toggleGroup: function (a) {
            this.$('.group[data-name="' + a + '"]').toggleClass("closed")
        },
        closeGroup: function (a) {
            this.$('.group[data-name="' + a + '"]').addClass("closed")
        },
        openGroup: function (a) {
            this.$('.group[data-name="' + a + '"]').removeClass("closed")
        },
        isGroupOpen: function (a) {
            return !this.$('.group[data-name="' + a + '"]').hasClass("closed")
        },
        closeGroups: function () {
            this.$(".group").addClass("closed")
        },
        openGroups: function () {
            this.$(".group").removeClass("closed")
        },
        onRemove: function () {
            b.invoke(this.papers, "remove");
            this.papers = {};
            this._paperDrag && (this._paperDrag.remove(), this._paperDrag = null);
            $(document.body).off(".stencil", this.onDrag).off(".stencil", this.onDragEnd);
            $(window).off(".stencil", this.onDragEnd);
        }
    })
}(joint, _);