document.addEventListener("DOMContentLoaded", function() {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            
            // Optional: Highlight current page link automatically
            const currentPage = window.location.pathname.split("/").pop();
            const links = document.querySelectorAll("nav a");
            links.forEach(link => {
                if(link.getAttribute("href") === currentPage) {
                    link.classList.add("text-white", "border-b-2", "border-white");
                } else {
                    link.classList.remove("text-white", "border-b-2", "border-white");
                }
            });
        });
});