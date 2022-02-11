let items = Array.from(document.querySelectorAll(".item"));

items.forEach(function (i) {
    i.addEventListener("click", function (e) {
        if (this.classList.contains("current")) {
            return;
        }

        let dir = this.classList.contains("left") ? "left" : "right";

        let left = document.querySelector(".left");
        let current = document.querySelector(".current");
        let right = document.querySelector(".right");

        if (dir == "left") {
            left.classList.add("current");
            left.classList.remove("left");

            current.classList.add("right");
            current.classList.remove("current");

            right.classList.add("left");
            right.classList.remove("right");
        } else {
            right.classList.add("current");
            right.classList.remove("right");

            current.classList.add("left");
            current.classList.remove("current");

            left.classList.add("right");
            left.classList.remove("left");
        }
    });
});
