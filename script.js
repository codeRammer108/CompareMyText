document.getElementById("compareButton").addEventListener("click", () => {
    const text1 = document.getElementById("text1").innerText;
    const text2 = document.getElementById("text2").innerText;

    // Perform comparison and update the DOM with highlighted results
    document.getElementById("text1").innerHTML = highlightDifferences(text1, text2);
    document.getElementById("text2").innerHTML = highlightDifferences(text2, text1);
});

function highlightDifferences(text1, text2) {
    const lcsMatrix = buildLCSMatrix(text1, text2);
    const highlightedText = buildHighlightedText(text1, text2, lcsMatrix);
    return highlightedText;
}

function buildLCSMatrix(text1, text2) {
    // Create a matrix to store LCS lengths
    const m = text1.length;
    const n = text2.length;
    const matrix = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Fill the LCS matrix
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1] + 1;
            } else {
                matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
            }
        }
    }
    console.log("Matrix:",  matrix)
    return matrix;
}

function buildHighlightedText(text1, text2, matrix) {
    let i = text1.length;
    let j = text2.length;
    let result = "";

    // Backtrack through the matrix to build the highlighted result
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            // Match - highlight green
            result = `<span class="similar">${text1[i - 1]}</span>` + result;
            i--;
            j--;
        } else if (matrix[i - 1][j] >= matrix[i][j - 1]) {
            // Difference in text1 - highlight red
            result = `<span class="different">${text1[i - 1]}</span>` + result;
            i--;
        } else {
            j--;
        }
    }

    // Handle remaining characters in text1
    while (i > 0) {
        result = `<span class="different">${text1[i - 1]}</span>` + result;
        i--;
    }

    return result;
}
