**https://leetcode-cn.com/problems/subarray-sum-equals-k/**

给你一个整数数组 nums 和一个整数 k ，请你统计并返回该数组中和为 k 的连续子数组的个数。  
```
示例 1：

输入：nums = [1,1,1], k = 2
输出：2
```
```
示例 2：

输入：nums = [1,2,3], k = 3
输出：2
```

------------
## 暴力解
```java
public class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        for (int start = 0; start < nums.length; ++start) {
            int sum = 0;
            for (int end = start; end >= 0; --end) {
                sum += nums[end];
                if (sum == k) {
                    count++;
                }
            }
        }
        return count;
    }
}
```
## 前缀和
```java
public class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0, pre = 0;
        HashMap < Integer, Integer > cache = new HashMap <>();
        // 处理 0-i 刚好满足要求的情况
        cache.put(0, 1);
        for (int i = 0; i < nums.length; i++) {
            pre += nums[i];
            count += cache.getOrDefault(pre - k, 0);
            cache.put(pre, cache.getOrDefault(pre, 0) + 1);
        }
        return count;
    }
}

```