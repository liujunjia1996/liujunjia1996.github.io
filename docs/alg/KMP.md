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
public class KMP {
    int[] next;
    String pat;

    KMP(String pat) {
        this.pat = pat;
        // 构建 next 数组
        var l = pat.length();
        next = new int[l];
        next[0] = 0;
        // 最长相同前后缀的前缀指针
        var i = 0;
        for (int j = 1; j < l; j++) {
            var char_ = pat.charAt(j);
            while (i > 0 && char_ != pat.charAt(i)) {
                // 这里为什么是 i = next[i - 1]; 而不是 i-- ？
                // eg aabaaf
                // 有一种对称的感觉，后半部分其实是比较过的了，
                // 所以直接通过 next[i - 1] 再找公共前后缀比一下末尾就行
                i = next[i - 1];
            }
            if (char_ == pat.charAt(i)) {
                i++;
            }
            next[j] = i;
        }
    }

    int search(String txt) {
        var l = txt.length();
        var j = 0;
        for (int i = 0; i < l; i++) {
            while (j > 0 && txt.charAt(i) != pat.charAt(j)) {
                j = next[j - 1];
            }
            if (txt.charAt(i) == pat.charAt(j)) {
                j++;
            }
            if (j == pat.length()) {
                return i - j + 1;
            }
        }
        return -1;
    }

}
```