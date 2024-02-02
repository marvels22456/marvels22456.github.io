// The script will remain the same as before, dynamically loading the content from 'data.json'
fetch('../data/data.json')
.then(response => response.json())
.then(data => {
    document.getElementById('tokenSymbol').innerText = data.tokenSymbol;  
    document.getElementById('tokenName').innerText = data.tokenName;
    document.getElementById('tokenSupply').innerText = `Token supply: ${data.tokenSupply}`;
    document.getElementById('tokenDescription').innerText = data.tokenDescription;

    const tokenomics = data.tokenomics.map(item => `<li>${item}</li>`).join('');
    document.getElementById('tokenomicsList').innerHTML = tokenomics;

    document.getElementById('tokenTelegram').href = data.tokenTelegram;
    document.getElementById('tokenAddress').innerText = data.tokenAddress;
    document.getElementById('tokenTwitter').href = data.tokenTwitterLink;
    document.getElementById('tokenDexetoolLink').href = data.tokenDexetoolLink;
    document.getElementById('tokenUniswapLink').href = data.tokenUniswapLink;
    document.getElementById('tokenEtherscanlink').href = data.tokenEtherscanlink;
    document.getElementById('tokenCalltoActionText').innerText = data.tokenCalltoActionText;
    document.getElementById('tokenDisclaimer').innerText = data.tokenDisclaimer;

    // Set the background color
    if (data.colourBackground) {
        document.body.style.backgroundColor = data.colourBackground;
        // Or, if you want to apply it to a specific element, use:
        // document.getElementById('yourElementId').style.backgroundColor = data.colourBackground;
    }
    if (data.colourSections) {
      document.querySelectorAll('.main-content').forEach(el => {
      el.style.backgroundColor = data.colourSections;
      });
    }

    if (data.navColourPrimary) {
    document.querySelectorAll('.fa-primary').forEach(el => {
        el.style.color = data.navColourPrimary;
    });
    }

    if (data.navColourSecondary) {
      document.querySelectorAll('.fa-secondary').forEach(el => {
          el.style.color = data.navColourSecondary;
      });
    }

    if (data.scrollbarColour) {
      const styleSheet = document.createElement('style');
      styleSheet.type = 'text/css';
      styleSheet.innerText = `body::-webkit-scrollbar-thumb { background: ${data.scrollbarColour}; }`;
      document.head.appendChild(styleSheet);
    }

    function isLightColor(hexColor) {
      const hex = hexColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
    
      // Calculate the brightness using a formula
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128; // Threshold of 128, can be adjusted
    }
    
    if (data.colourBackground) {
      const bgColor = data.colourBackground;
      document.body.style.backgroundColor = bgColor;
    
      if (isLightColor(bgColor)) {
          document.body.classList.add('text-dark');
          document.body.classList.remove('text-light');
      } else {
          document.body.classList.add('text-light');
          document.body.classList.remove('text-dark');
      }
    }
    
    if (data.colourSections) {
      document.querySelectorAll('.main-content').forEach(el => {
          const sectionColor = data.colourSections;
          el.style.backgroundColor = sectionColor;
    
          if (isLightColor(sectionColor)) {
              el.classList.add('text-dark');
              el.classList.remove('text-light');
          } else {
              el.classList.add('text-light');
              el.classList.remove('text-dark');
          }
      });
    }
    
});


document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Check the class of the entry and apply the animation accordingly
              if (entry.target.classList.contains('pic_logo')) {
                  resetAnimation(entry.target, 'animate__bounce', 'animate__flip');
              } else if (entry.target.classList.contains('pic1')) {
                  resetAnimation(entry.target, 'animate__fadeInBottomRight');
              } else if (entry.target.classList.contains('pic2')) {
                  resetAnimation(entry.target, 'animate__fadeInTopLeft');
              }
          }
      });
  }, {
      threshold: 0 // Adjust as needed
  });

  // Function to reset the animation
  function resetAnimation(element, ...animationClasses) {
      animationClasses.forEach(animationClass => {
          element.classList.remove(animationClass);
          void element.offsetWidth; // Trigger reflow to restart animation
          element.classList.add(animationClass);
      });
  }

  // Select elements to observe
  const elementsToAnimate = document.querySelectorAll('.pic_logo, .pic1, .pic2');
  elementsToAnimate.forEach(el => observer.observe(el));
});

const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark"
};

const theme = localStorage.getItem('theme')
  || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem('theme', next);
}
document.addEventListener("DOMContentLoaded", function() {
  var navbar = document.querySelector('.navbar');

  navbar.addEventListener('click', function() {
      this.classList.toggle('expanded');
  });
});

document.getElementById('themeButton').onclick = toggleTheme;
