function xorEncryptDecrypt(input, key) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return output;
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

async function processFile(encrypt) {
    const fileInput = document.getElementById('fileInput');
    const keyInput = document.getElementById('keyInput');
    const file = fileInput.files[0];
    const key = keyInput.value;

    if (!file || !key) {
        alert('Please upload a file and enter a key.');
        return;
    }

    try {
        const fileContent = await readFile(file);
        const processedContent = xorEncryptDecrypt(fileContent, key);
        const blob = new Blob([processedContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.getElementById('downloadLink');
        link.href = url;
        link.download = encrypt ? 'encrypted.txt' : 'decrypted.txt';
        link.style.display = 'inline';
        link.textContent = `Download ${encrypt ? 'Encrypted' : 'Decrypted'} File`;
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

function encryptFile() {
    processFile(true);
}

function decryptFile() {
    processFile(false);
}
