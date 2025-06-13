//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(imageObj) {
	return new Promise((resolve, reject) => {
		const img = new Image();

		img.onload = () => {
			resolve(img);
		};

		img.onerror = () => {
			reject(new Error(`Failed to load image: ${imageObj}`));
		};

		img.src = imageObj.url;
	})
}

async function downloadImages() {
	loading.style.display = 'block';
    error.style.display = 'none';
    output.innerHTML = '';
    btn.disabled = true;

	try {
		const imagePromises = images.map(imageObj => downloadImage(imageObj))

		const downloadedImages = await Promise.all(imagePromises);

		loading.style.display = 'none';

		downloadedImages.forEach(img => {
        output.appendChild(img);
		})

		const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = `Successfully downloaded ${downloadedImages.length} images!`;
        output.parentNode.insertBefore(successMsg, output);

		setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 3000);
	} catch (err) {
		loading.style.display = 'none';

		error.style.display = 'block';
        error.textContent = `Error downloading images: ${err.message}`;

		console.error('Download failed:', err);
	} finally {
        btn.disabled = false;
    }
}

btn.addEventListener('click', downloadImages);








