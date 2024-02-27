document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        const deleteBtn = card.querySelector(".delete");
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("id");
            let dConf = confirm("Are you sure you want to delete");
            if (dConf) {
                $.ajax({
                    url: `/delete?id=${id}`,
                    type: "GET",
                    success: function (data) {
                        if (data.error) {
                            alert(data.error);
                        } else {
                            card.remove();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    }
                });
            }
        });
    });
});
