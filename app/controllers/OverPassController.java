package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;


/**
 * Created by vladi on 02.01.15.
 */
public class OverPassController extends Controller {
    public static Result askForRiversOnMyScreen() {
        ObjectNode result = Json.newObject();
        result.put("exampleField1", "foobar");
        result.put("exampleField2", "Hello world!");
        return ok(result);
    }
}
