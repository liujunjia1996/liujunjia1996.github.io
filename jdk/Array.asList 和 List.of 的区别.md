## 可变性
Arrays.asList 返回部分可变的 list，而 List.of 返回的是完全不可变的 list，即 asList 不能增删，可以更新；of 不能增删和更新

```java
List<Integer> list = Arrays.asList(1, 2, null);
list.set(1, 10); // OK
List<Integer> list2 = List.of(1, 2, 3);
list2.set(1, 10); // UnsupportedOperationException
```

## 对 null 的处理
Arrays.asList 入参支持存入 `null`，而 List.of 不行；类似地，Arrays.asList 的 contains 方法支持传入 null，而 List.of 不行

```java
List<Integer> list = Arrays.asList(1, 2, null); // OK
List<Integer> list = List.of(1, 2, null); 
// 异常：NullPointerException
// idea 也会报警告： Passing 'null' argument to parameter annotated as @NotNull 
```
## 副作用
Arrays.asList 原数组的修改会影响新 List，而 List.of 不会

```java
Integer[] array = {1,2,3};
List<Integer> list = Arrays.asList(array);
array[1] = 10;
System.out.println(list); // 输出 [1, 10, 3]
Integer[] array2 = {1,2,3};
List<Integer> list2 = List.of(array2);
array[1] = 10;
System.out.println(list2); // 输出 [1, 2, 3]
```

## 总结
这三个最应该警惕的是第三点，因为第三点在 idea 上没有任何的警告

至于使用上，个人比较喜欢 List.of ，因为它的返回的 list 很纯粹，完全不支持更新操作，而 Arrays.asList 返回的 List 虽然可以修改，但是功能不完全（比如不能 add），不纯粹，对于要得到可修改的 List 的需求，我会直接选择 `new ArrayList<>(List.of(1, 2, 3))` 手动创建一个正常的 ArrayList

但是，List.of 属于 jdk11，jdk11 在团队内部是没有问题的，但是当我提供 sdk 给别的团队用时，尽量就不要用 List.of 了，因为有的团队还在跑 jdk8 （题外话，虽然本地的 jdk 是 11 的，但是可以在 idea 上为某个项目设置语法级别，这样就可以用 jdk11 开发出 jdk8 可用的 sdk 了）
