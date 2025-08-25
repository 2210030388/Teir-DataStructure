# Teir-DataStructure
**What is Teir (Tier) Data Structure?**

A Tier Data Structure (sometimes also referred to as Tier Tree or Teir structure) is a balanced tree-based data structure designed for efficient string storage and retrieval.
It combines the ideas of tries and balanced trees:
Like a trie, it stores strings character by character.
Like a balanced binary search tree, it maintains balance to ensure logarithmic height.
Each node represents a character, and strings are stored as paths from root to leaf.
-> Insertion: Characters of a string are inserted level by level. If a branch already exists, the structure reuses it (like a trie).
-> Search: The string is traversed character by character. If all characters are found in sequence, the string exists.
-> Deletion: A string can be removed by clearing its path, provided no other string depends on it.
-> Balancing: To avoid skewed growth, the structure uses balancing rules (like AVL or Red-Black trees) at each level.

This makes operations fast:
Insert → O(log n)
Search → O(log n)
Delete → O(log n)

**Q) What I did in the code?**
Implemented the Teir Data Structure in C (or C++/Java depending on your code).
Added functions for:

Insert → to add strings into the structure.
Search → to check if a string exists.
Delete → to remove strings.
Traversal → to display all stored strings in sorted order.
Tested the structure with different string inputs.

**Applications in Real Life**

Tier (Teir) data structures are used where fast string operations are needed:
Autocomplete systems (e.g., Google search suggestions).
Spell checkers (checking dictionary words quickly).
Text editors & IDEs (code completion features).
IP routing tables (storing and searching prefixes efficiently).
Bioinformatics (DNA sequence storage and search).
