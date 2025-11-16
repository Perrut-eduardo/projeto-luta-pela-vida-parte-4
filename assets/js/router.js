async function loadPage(page) {
    const app = document.querySelector("#app");

    try {
        const response = await fetch(`pages/${page}.html`);
        const html = await response.text();
        app.innerHTML = html;

        // carregar JS da página se existir
        if (page === "cadastro") {
            import("./pages/cadastro.js");
        }

    } catch (error) {
        app.innerHTML = "<h2>Erro ao carregar página.</h2>";
    }
}

export { loadPage };
