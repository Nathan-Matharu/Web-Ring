// URL to your raw webring.json file on GitHub
const DATA_URL = "https://raw.githubusercontent.com/Nathan-Matharu/Web-Ring/main/webring.json";

async function initWebring() {
  try {
    const response = await fetch(DATA_URL);
    const sites = await response.json();
    
    // Get the current site's URL origin (e.g., "https://your-username.github.io")
    const currentOrigin = window.location.origin.toLowerCase();
    
    // Find the index of the current site in the webring array
    const currentIndex = sites.findIndex(site => site.url.toLowerCase().includes(currentOrigin));
    
    if (currentIndex === -1) {
      console.log("This site isn't registered in the webring layout yet.");
      return;
    }

    // Math to handle wrapping around the array seamlessly
    const prevIndex = (currentIndex - 1 + sites.length) % sites.length;
    const nextIndex = (currentIndex + 1) % sites.length;

    const prevSite = sites[prevIndex];
    const nextSite = sites[nextIndex];

    // Inject the links into the HTML containers
    document.getElementById("webring-prev").href = prevSite.url;
    document.getElementById("webring-prev").innerText = `← ${prevSite.name}`;
    
    document.getElementById("webring-next").href = nextSite.url;
    document.getElementById("webring-next").innerText = `${nextSite.name} →`;
    
  } catch (error) {
    console.error("Error loading webring data:", error);
  }
}

document.addEventListener("DOMContentLoaded", initWebring);