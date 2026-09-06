const { createJimp } = require('jimp');

async function processImage() {
  const { Jimp } = await import('jimp');
  const image = await Jimp.read('d:/OnkarGutti/public/onkar.jpg');

  const width = image.bitmap.width;
  const height = image.bitmap.height;

  // Let's sample the background color from top corners
  // Target color is around crimson red
  // We will do a multi-seed flood fill starting from all perimeter edge pixels
  const visited = new Uint8Array(width * height);
  const isBackground = new Uint8Array(width * height);

  // Check if a pixel is background red
  function isRedBg(r, g, b) {
    // Background is strong red: r is significantly greater than g and b
    // r/g ratio is high (> 1.6), and r/b ratio is high (> 1.6)
    const maxGB = Math.max(g, b);
    return r > 80 && (r - maxGB > 40) && (r / (maxGB + 1) > 1.4);
  }

  // Queue for BFS flood fill
  const queue = [];

  // Seed with all edge pixels that match background
  for (let x = 0; x < width; x++) {
    // Top edge
    let idx = 0 * width + x;
    let r = image.bitmap.data[idx * 4];
    let g = image.bitmap.data[idx * 4 + 1];
    let b = image.bitmap.data[idx * 4 + 2];
    if (isRedBg(r, g, b)) {
      visited[idx] = 1;
      isBackground[idx] = 1;
      queue.push(x, 0);
    }

    // Bottom edge (only if background)
    idx = (height - 1) * width + x;
    r = image.bitmap.data[idx * 4];
    g = image.bitmap.data[idx * 4 + 1];
    b = image.bitmap.data[idx * 4 + 2];
    if (isRedBg(r, g, b)) {
      visited[idx] = 1;
      isBackground[idx] = 1;
      queue.push(x, height - 1);
    }
  }

  for (let y = 0; y < height; y++) {
    // Left edge
    let idx = y * width + 0;
    let r = image.bitmap.data[idx * 4];
    let g = image.bitmap.data[idx * 4 + 1];
    let b = image.bitmap.data[idx * 4 + 2];
    if (isRedBg(r, g, b)) {
      visited[idx] = 1;
      isBackground[idx] = 1;
      queue.push(0, y);
    }

    // Right edge
    idx = y * width + (width - 1);
    r = image.bitmap.data[idx * 4];
    g = image.bitmap.data[idx * 4 + 1];
    b = image.bitmap.data[idx * 4 + 2];
    if (isRedBg(r, g, b)) {
      visited[idx] = 1;
      isBackground[idx] = 1;
      queue.push(width - 1, y);
    }
  }

  // BFS Flood Fill from edges
  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx]) {
          visited[nIdx] = 1;
          const nr = image.bitmap.data[nIdx * 4];
          const ng = image.bitmap.data[nIdx * 4 + 1];
          const nb = image.bitmap.data[nIdx * 4 + 2];

          if (isRedBg(nr, ng, nb)) {
            isBackground[nIdx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Apply transparency to all connected background pixels + soft edge feathering
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (isBackground[idx]) {
        image.bitmap.data[idx * 4 + 3] = 0; // 100% transparent
      } else {
        // Check if on the edge (adjacent to a background pixel) for smooth antialiased alpha
        let bgNeighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              if (isBackground[ny * width + nx]) {
                bgNeighbors++;
              }
            }
          }
        }

        if (bgNeighbors > 0) {
          const r = image.bitmap.data[idx * 4];
          const g = image.bitmap.data[idx * 4 + 1];
          const b = image.bitmap.data[idx * 4 + 2];
          // Remove red color spill on edge pixels
          if (r > g && r > b) {
            image.bitmap.data[idx * 4] = Math.round((g + b) / 2);
          }
          // Smooth alpha transition
          image.bitmap.data[idx * 4 + 3] = Math.round(255 * (1 - bgNeighbors / 12));
        }
      }
    }
  }

  await image.write('d:/OnkarGutti/public/onkar-transparent.png');
  console.log('Successfully generated transparent cutout: d:/OnkarGutti/public/onkar-transparent.png');
}

processImage().catch(console.error);
