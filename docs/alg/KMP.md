kmp 也可以理解为一种动态规划，相对于前缀表殊途同归。

```java
public class KMP {
    private final int[][] dp;
    private final String pat;

    public KMP(String pat) {
        this.pat = pat;
        // 通过 pat 构建 dp 数组
        // 需要 O(M) 时间
        int m = pat.length();
        dp = new int[m][256];
        dp[0][pat.charAt(0)] = 1;
        // 折返位置
        int x = 0;
        for (int j = 1; j < m; j++) {
            var char_ = pat.charAt(j);
            for (int i = 0; i < 256; i++) {
                dp[j][i] = char_ == i ? j + 1 : dp[x][i];
            }
            x = dp[x][char_];
        }
    }

    public int search(String txt) {
        // 借助 dp 数组去匹配 txt
        // 需要 O(N) 时间
        int m = pat.length();
        int n = txt.length();
        // 状态机的状态
        int j = 0;
        for (int i = 0; i < n; i++) {
            j = dp[j][txt.charAt(i)];
            if (j == m) return i - m + 1;
        }
        return -1;
    }
}
```
---
前缀表版本
```java
class Solution {
    //前缀表（不减一）Java实现
    public int strStr(String haystack, String needle) {
        if (needle.length() == 0) return 0;
        int[] next = new int[needle.length()];
        getNext(next, needle);

        int j = 0;
        for (int i = 0; i < haystack.length(); i++) {
            while (j > 0 && needle.charAt(j) != haystack.charAt(i)) 
                j = next[j - 1];
            if (needle.charAt(j) == haystack.charAt(i)) 
                j++;
            if (j == needle.length()) 
                return i - needle.length() + 1;
        }
        return -1;

    }
    
    private void getNext(int[] next, String s) {
        int j = 0;
        next[0] = 0;
        for (int i = 1; i < s.length(); i++) {
            while (j > 0 && s.charAt(j) != s.charAt(i)) 
                j = next[j - 1];
            if (s.charAt(j) == s.charAt(i)) 
                j++;
            next[i] = j; 
        }
    }
}
```