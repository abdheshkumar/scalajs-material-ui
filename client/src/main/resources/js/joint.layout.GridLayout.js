joint.layout = joint.layout || {}, joint.layout.GridLayout = {
    layout: function(graph, b) {
        var c;
        c = graph instanceof joint.dia.Graph ? graph : (new joint.dia.Graph).resetCells(graph, {
            dry: !0
        }), graph = null, b = b || {};
        var d = c.getElements(),
            e = b.columns || 1,
            f = b.dx || 0,
            g = b.dy || 0,
            h = b.columnWidth || this._maxDim(d, "width") + f,
            i = b.rowHeight || this._maxDim(d, "height") + g,
            j = _.isUndefined(b.centre) || b.centre !== !1,
            k = !!b.resizeToFit,
            l = b.marginX || 0,
            m = b.marginY || 0;
        c.startBatch("layout"), _.each(d, function(a, b) {
            var c = 0,
                d = 0,
                n = a.get("size");
            if (k) {
                var o = h - 2 * f,
                    p = i - 2 * g,
                    q = n.height * (n.width ? o / n.width : 1),
                    r = n.width * (n.height ? p / n.height : 1);
                q > i ? o = r : p = q, n = {
                    width: o,
                    height: p
                }, a.set("size", n)
            }
            j && (c = (h - n.width) / 2, d = (i - n.height) / 2), c += l, d += m, a.set("position", {
                x: b % e * h + f + c,
                y: Math.floor(b / e) * i + g + d
            })
        }), c.stopBatch("layout")
    },
    _maxDim: function(a, b) {
        return _.reduce(a, function(a, c) {
            return Math.max(c.get("size")[b], a)
        }, 0)
    }
};