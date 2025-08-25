class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this._findNode(word);
        return node !== null && node.isEndOfWord;
    }

    delete(word) {
        return this._deleteNode(this.root, word, 0);
    }

    _deleteNode(node, word, depth) {
        if (!node) {
            return false;
        }

        if (depth === word.length) {
            if (node.isEndOfWord) {
                node.isEndOfWord = false;
                return Object.keys(node.children).length === 0; // If no children, true
            }
            return false; // Word not found
        }

        const char = word[depth];
        const shouldDeleteCurrentNode = this._deleteNode(node.children[char], word, depth + 1);

        if (shouldDeleteCurrentNode) {
            delete node.children[char];
            return Object.keys(node.children).length === 0; // If no children, true
        }
        return false;
    }

    autocomplete(prefix) {
        let node = this._findNode(prefix);
        if (!node) {
            return [];
        }
        return this._findAllWordsFromNode(node, prefix);
    }

    _findNode(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                return null;
            }
            node = node.children[char];
        }
        return node;
    }

    _findAllWordsFromNode(node, prefix) {
        let words = [];
        if (node.isEndOfWord) {
            words.push(prefix);
        }
        for (const char in node.children) {
            words = words.concat(this._findAllWordsFromNode(node.children[char], prefix + char));
        }
        return words;
    }

    reset() {
        this.root = new TrieNode();
    }
}

const trie = new Trie();

// Upload Words from File
document.getElementById('uploadBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const fileAddResult = document.getElementById('fileAddResult');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const fileContent = event.target.result;
            const words = fileContent.split(/\s+/); // Split by whitespace (spaces, tabs)
            words.forEach(word => {
                if (word.trim()) {
                    trie.addWord(word.trim());
                }
            });
            fileAddResult.innerHTML = `${words.length} words added to the trie from the file.`;
        };

        reader.onerror = function () {
            fileAddResult.innerHTML = 'Error reading file.';
        };

        reader.readAsText(file);
    } else {
        fileAddResult.innerHTML = 'Please select a file to upload.';
    }
});

// Add Word
document.getElementById('addWordBtn').addEventListener('click', () => {
    const wordInput = document.getElementById('wordInput').value.trim();
    const addResult = document.getElementById('addResult');
    if (wordInput) {
        trie.addWord(wordInput);
        addResult.innerHTML = `Added: ${wordInput}`;
        document.getElementById('wordInput').value = ''; // Clear input
    } else {
        addResult.innerHTML = 'Please enter a valid word.';
    }
});

// Search Word
document.getElementById('searchBtn').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    const searchResult = document.getElementById('searchResult');
    if (searchInput) {
        const found = trie.search(searchInput);
        searchResult.innerHTML = found ? `${searchInput} was found in the trie.` : `${searchInput} was not found in the trie.`;
    } else {
        searchResult.innerHTML = 'Please enter a word to search.';
    }
});

// Delete Word
document.getElementById('deleteWordBtn').addEventListener('click', () => {
    const deleteInput = document.getElementById('searchInput').value.trim();
    const searchResult = document.getElementById('searchResult');
    if (deleteInput) {
        const deleted = trie.delete(deleteInput);
        searchResult.innerHTML = deleted ? `${deleteInput} was deleted from the trie.` : `${deleteInput} was not found in the trie.`;
    } else {
        searchResult.innerHTML = 'Please enter a word to delete.';
    }
});

// Autocomplete
document.getElementById('autocompleteInput').addEventListener('input', () => {
    const input = document.getElementById('autocompleteInput').value.trim();
    const suggestions = trie.autocomplete(input);
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = ''; // Clear previous suggestions
    suggestions.forEach((word) => {
        const li = document.createElement('li');
        li.textContent = word;
        suggestionsList.appendChild(li);
    });
});

// Reset Trie
document.getElementById('resetBtn').addEventListener('click', () => {
    trie.reset();
    document.getElementById('fileAddResult').innerHTML = '';
    document.getElementById('addResult').innerHTML = '';
    document.getElementById('searchResult').innerHTML = '';
    document.getElementById('autocompleteInput').value = '';
    document.getElementById('suggestionsList').innerHTML = '';
    document.getElementById('wordInput').value = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('resetResult').innerHTML = 'Trie has been reset.';
});