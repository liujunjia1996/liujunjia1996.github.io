最近升级了 jdk ，写一个测试代码的时候，发现 idea 有个波浪线，作为代码警告强迫症，点开看了看

![image](https://user-images.githubusercontent.com/43411944/164650963-e7d379cb-a8cf-4ad7-b00d-18bfb7fba14a.png)


心想 record 是神马玩意？于是 Google 了一波

## record 是什么

record 其实是一个语法糖，简化了某一类对象的声明方式。比如下面是 jdk16 以前的声明：

```
public class Person {
    private final String name;
    private final String gender;
    private final int age;

    public Person(String name, String gender, int age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public String getGender() {
        return gender;
    }

    public int getAge() {
        return age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Person person = (Person) o;
        return age == person.age &&
                Objects.equals(name, person.name) &&
                Objects.equals(gender, person.gender);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, gender, age);
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

在 jdk17 ，只需要一行

```
public record Person(String name, String gender, int age) {}
```

## record 解决了什么问题

简化了很多一次性对象(更准确的说是 immutable 对象)的声明，比如一些 vo、dto 之类的  
> Records provide a compact syntax for declaring classes which are plain immutable data carriers.

但是 record 感觉还是没有 lombok 的 @Data 注解方便，@Data 的方式一个类里面有什么变量一目了然，而且字段是否能修改取决与是否加了 final 修饰，比 record 灵活多了。  
总结：没啥用，不如 lombok，over  
ps：java 不是一个低糖语言吗，怎么感觉语法糖越来越多了。。。
