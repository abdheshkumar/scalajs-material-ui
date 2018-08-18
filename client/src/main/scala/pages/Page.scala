package pages

import inner.{InnerPage1Component, InnerPage2Component}
import japgolly.scalajs.react.extra.router.{Redirect, RouterConfig, RouterConfigDsl, StaticDsl}
import outer.{Page1Component, Page2Component}

sealed trait Page

object Page {

  def routes: RouterConfig[Page] = RouterConfigDsl[Page].buildConfig { dsl =>
    import dsl._
    (emptyRule
      | (staticRoute(root, Page1) ~> renderR { ctrl =>
      Page1Component(ctrl).render
    }) | (staticRoute("page2", Page2) ~> renderR { ctrl =>
      Page2Component(ctrl).render
    }) | InnerPage.route)
      .notFound(_ => redirectToPage(Page1)(Redirect.Replace))
      .logToConsole
  }
}

case object Page1 extends Page

case object Page2 extends Page

case class OuterPage(page: InnerPage) extends Page

sealed trait InnerPage

object InnerPage {
  def outerPageToInner: PartialFunction[Page, InnerPage] = {
    case OuterPage(innerPage) => innerPage
  }

  def innerPageToOuterPage(innerPage: InnerPage): Page = innerPage match {
    case InnerToOuterPage(page) => page
    case page => OuterPage(page)
  }

  def route: StaticDsl.Rule[Page] = {
    val rules = RouterConfigDsl[InnerPage].buildRule { dsl =>
      import dsl._
      (emptyRule
        | (staticRoute(root, InnerPage1) ~> renderR { ctrl =>
        InnerPage1Component(ctrl).render
      }) | (dynamicRouteCT("inner2" / string("[a-z]+").caseClass[InnerPage2]) ~> dynRenderR { (page, ctrl) =>
        InnerPage2Component(ctrl).render
      }))
    }
    rules
      .prefixPath_/("inner")
      .pmap[Page](innerPageToOuterPage)(outerPageToInner)
  }
}

case object InnerPage1 extends InnerPage

case class InnerPage2(q: String) extends InnerPage

case class InnerToOuterPage(page: Page) extends InnerPage



