package controllers;

import play.mvc.Controller;
import play.mvc.Result;

public class Application extends Controller {
    
    public static Result index() {
        return ok(views.html.index.render("Hello Play Framework !"));
    }

    public static Result mappa() {
        return ok(views.html.mappa.render());
    }
}
