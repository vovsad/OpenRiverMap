package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import play.libs.F.Function;
import play.libs.F.Promise;
import play.libs.ws.*;

/**
 * Created by vladi on 02.01.15.
 */
public class OverPassController extends Controller {

	public Promise<Result> askForRiversOnMyScreen(double e, double n,
			double s, double w) {

		StringBuilder template = new StringBuilder(
				"<osm-script output=\"json\" timeout=\"25\">")
				.append("<union into=\"_\">")
				.append("<query into=\"_\" type=\"way\">")
				.append("<has-kv k=\"waterway\" modv=\"\" v=\"river\"/>")
				.append("<bbox-query e=\"")
				.append(Double.toString(e))
				.append("\" into=\"_\" n=\"")
				.append(Double.toString(n))
				.append("\" s=\"")
				.append(Double.toString(s))
				.append("\" w=\"")
				.append(Double.toString(w))
				.append("\"/>")
				.append("</query>")
				.append("</union>")
				.append("<print e=\"\" from=\"_\" geometry=\"skeleton\" limit=\"\" mode=\"body\" n=\"\" order=\"id\" s=\"\" w=\"\"/>")
				.append("<recurse from=\"_\" into=\"_\" type=\"down\"/>")
				.append("<print e=\"\" from=\"_\" geometry=\"skeleton\" limit=\"\" mode=\"skeleton\" n=\"\" order=\"quadtile\" s=\"\" w=\"\"/>")
				.append("</osm-script>");

		return WS.url("http://overpass-api.de/api/interpreter")
				.post("data=" + template)
				.map(new Function<WSResponse, Result>() {
					public Result apply(WSResponse response) {
						return ok(response.asJson());
					}
				});

	}

	// double topX, double topY, double bottomX, double bottomY
	// <bbox-query e=\"26.941223144531246\" into=\"_\" n=\"49.55372551347579\"
	// s=\"48.494767515307295\" w=\"24.88128662109375\"/>
	public Promise<Result> askForRiverGeoJSON(double e, double n,
			double s, double w) {
		StringBuilder template = new StringBuilder(
				"<osm-script output=\"json\" timeout=\"25\">")
				.append("<union into=\"_\">")
				.append("<query into=\"_\" type=\"node\">")
				.append("<has-kv k=\"name\" modv=\"\" v=\"Стрипа\"/>")
				.append("<has-kv k=\"waterway\" modv=\"\" v=\"river\"/>")
				.append("<bbox-query e=\"26.941223144531246\" into=\"_\" n=\"49.55372551347579\" s=\"48.494767515307295\" w=\"24.88128662109375\"/>")
				.append("</query>")
				.append("<query into=\"_\" type=\"way\">")
				.append("<has-kv k=\"name\" modv=\"\" v=\"Стрипа\"/>")
				.append("<has-kv k=\"waterway\" modv=\"\" v=\"river\"/>")
				.append("<bbox-query e=\"26.941223144531246\" into=\"_\" n=\"49.55372551347579\" s=\"48.494767515307295\" w=\"24.88128662109375\"/>")
				.append("</query>")
				.append("<query into=\"_\" type=\"relation\">")
				.append("<has-kv k=\"name\" modv=\"\" v=\"Стрипа\"/>")
				.append("<has-kv k=\"waterway\" modv=\"\" v=\"river\"/>")
				.append("<bbox-query e=\"26.941223144531246\" into=\"_\" n=\"49.55372551347579\" s=\"48.494767515307295\" w=\"24.88128662109375\"/>")
				.append("</query>")
				.append("</union>")
				.append("<print e=\"\" from=\"_\" geometry=\"skeleton\" limit=\"\" mode=\"body\" n=\"\" order=\"id\" s=\"\" w=\"\"/>")
				.append("<recurse from=\"_\" into=\"_\" type=\"down\"/>")
				.append("<print e=\"\" from=\"_\" geometry=\"skeleton\" limit=\"\" mode=\"skeleton\" n=\"\" order=\"quadtile\" s=\"\" w=\"\"/>")
				.append("</osm-script>");

		return WS.url("http://overpass-api.de/api/interpreter")
				.post("data=" + template)
				.map(new Function<WSResponse, Result>() {
					public Result apply(WSResponse response) {
						return ok(response.asJson());
					}
				});
	}
}
