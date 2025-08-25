import java.io.*;
import java.util.*;

class TrieImplement {
    public static void main(String args[]) throws IOException {
        Scanner f = new Scanner(System.in);
        Trie root = new Trie();
        System.out.println();
        System.out.println("Operations You Can Perform: ");
        System.out.println("1 S : Insert S" + "\n2 S : Does S Exists ?" + "\n3 PS : Give All Words With Prefix as PS");
        System.out.println("4 : Get All Words" + "\n5 X : Increse Number Of Operations By X");
        int n = f.nextInt();
        while (n-- != 0) {
            int op = f.nextInt();
            if (op == 1) {
                String s = f.next();
                insert(root, s);
                System.out.println("Inserted \"" + s + "\" successfully ");
            } else if (op == 2) {
                String s = f.next();
                System.out.println( exists(s, root) ? "Exists" : "Not Exists");
            } else if (op == 3) {
                String s = f.next();
                List<String> ans = autocomplete(s, root);
                System.out.println("Word(s) with common prefix as \"" + s + "\" -> " + ans);
            } else if(op==4) {
                List<String> ans = new ArrayList<>();
                getAllWords(root, "", ans);
                System.out.println("All the inserted words are : " + ans);
            }
            else if(op==5)
            {
                int x = f.nextInt();
                n+=x;
                System.out.println("Increased Number of Operations !!" + "  Operations Left : " + n  );
            }
        }
    }

    // s = 'apple'
    static void insert(Trie root, String s) {
        Trie te = root;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            int id = c - 'a';

            // System.out.println(c);
            if (te.a[id] == null) {
                te.a[id] = new Trie();
            }
            te.wc += 1;
            te = te.a[id];
        }
        te.ended = true;
        // System.out.println(te1.wc);
    }

    static boolean exists(String s, Trie root) {
        Trie node = root;
        for (int i = 0; i < s.length(); i++) {
            int id = s.charAt(i) - 'a';
            if (node.a[id] == null)
                return false;
            node = node.a[id];
        }
        return node.ended;
    }

    static void getAllWords(Trie root, String te, List<String> ans) {
        if (root == null)
            return;

        if (root.ended) {
            ans.add(te);
            // return;
        }

        for (int i = 0; i < 26; i++) {
            if (root.a[i] != null) {
                getAllWords(root.a[i], te + "" + (char) ('a' + i), ans);
            }
        }
    }

    public static List<String> autocomplete(String prefix, Trie root) {
        List<String> result = new ArrayList<>();
        Trie node = root;

        // Find the end node of the prefix
        for (char c : prefix.toCharArray()) {
            int index = c - 'a';
            if (node.a[index] == null) {
                return result; // If the prefix is not found, return empty list
            }
            node = node.a[index];
        }

        // Collect all words from the end node
        collectAllWords(node, prefix, result);
        return result;
    }

    // Helper method to collect all words from the Trie
    private static void collectAllWords(Trie node, String prefix, List<String> result) {
        if (node.ended) {
            result.add(prefix); // If it's the end of a word, add it to results
        }

        for (int i = 0; i < 26; i++) {
            if (node.a[i] != null) {
                collectAllWords(node.a[i], prefix + (char) (i + 'a'), result);
            }
        }
    }
}

class Trie {
    Trie a[] = null;
    boolean ended;
    int wc;

    Trie() {
        a = new Trie[26];
        ended = false;
        wc = 0;
    }
}