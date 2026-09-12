
async function includeHTML(elementId, file) {

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Could not load ${file}`);
        }

        const html = await response.text();

        document.getElementById(elementId).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

includeHTML(
    "main-content",
    "src/component/indexMainContent.html"
);