import "@components";

export function notFoundPage() {
  return /* html */ `
<main class="flex justify-center items-center h-screen">
  <div class="text-center">
    <p class="font-semibold text-h1 text-trust">404</p>
    <h1 class="text-display">Page not found</h1>
    <p class="text-gray-500 pt-6 font-semibold">Sorry, we couldn’t find the page you’re looking for.</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
    <a href="/">
        <base-button text="Back Home"></base-button>
    <a>
    </div>
  </div>
</main>
  `;
}
