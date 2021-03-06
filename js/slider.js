min_year = 1960;
max_year = 2010;

// Initialize slider
var slider = d3.slider()
	.min(min_year)
	.max(max_year)
	.tickValues(d3.range(min_year, max_year + 1, 10))
	.stepValues(d3.range(min_year, max_year + 1, 1))
	.showRange(true)
	.value(init_year)
    .tickFormat(d3.format("d"))
    .callback(function(event) {
        year = String(self.slider.value());
        svg.selectAll(".country")
            .style("fill", function(d) { return set_country_color(d, year); })
            .on("mouseover", function(d) { set_tooltip(d, year); })                
            .on("mouseout", function(d)  { disable_tooltip(); });
    });

// Render the slider in the div
d3.select(".slider").call(slider);


// Animate button
$(".slider-button").click(function() {
    $(".slider-button").removeClass("slider-button-unpressed");
    $(".slider-button").addClass("slider-button-pressed");
    time_travel(min_year);
});

function time_travel(pos) {
    $(".slider-button").prop("disabled", true);
    setTimeout(function() {
        slider.setValue(pos);
        if (pos < max_year) {
            time_travel(++pos);
        } else {
            $(".slider-button").prop("disabled", false);
            $(".slider-button").addClass("slider-button-unpressed");
             $(".slider-button").removeClass("slider-button-pressed");
        }
    }, 80);
}