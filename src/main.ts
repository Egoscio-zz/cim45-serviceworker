import $ from "jquery";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./sw.js", {
            scope: "./"
        })
        .then(registration => {
            console.log("Worker registered successfully.");
        })
        .catch(error => {
            console.log(`Worked failed to register: ${error}`);
        });
}

$(() => {
    const $select = $<HTMLSelectElement>("#select-background");
    $select.on("change", function() {
        $(this)
            .find(".placeholder")
            .attr({ disabled: true });
        $(document.body).css({
            "background-image": `url("assets/light${$(this).val()}.jpg")`
        });
    });
});
