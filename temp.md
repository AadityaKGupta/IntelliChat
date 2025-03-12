Several Java methods can check if a number is prime. Here are two versions: a basic (but less efficient) version and an
optimized version.

**Version 1: Basic (Less Efficient)**

This version checks divisibility from 2 up to `n-1`. It's simple to understand but less efficient for larger numbers.

```java
class PrimeChecker {

public static boolean isPrimeBasic(int n) {
// Prime numbers are greater than 1
if (n <= 1) { return false; } // Check divisibility from 2 up to n-1 for (int i=2; i < n; i++) { if (n % i==0) { return
    false; // Divisible, so not prime } } return true; // Not divisible by any number, so it's prime } public static
    void main(String[] args) { int num=17; if (isPrimeBasic(num)) { System.out.println(num + " is a prime number." ); }
    else { System.out.println(num + " is not a prime number." ); } num=20; if (isPrimeBasic(num)) {
    System.out.println(num + " is a prime number." ); } else { System.out.println(num + " is not a prime number." ); } }
    } ``` **Version 2: Optimized** This version improves efficiency by only checking divisibility up to the square root
    of `n`. If a number has a divisor greater than its square root, it must also have a divisor smaller than its square
    root. ```java class PrimeCheckerOptimized { public static boolean isPrimeOptimized(int n) { // Prime numbers are
    greater than 1 if (n <=1) { return false; } // 2 is a special case (the only even prime number) if (n==2) { return
    true; } // Even numbers greater than 2 are not prime if (n % 2==0) { return false; } // Check divisibility only up
    to the square root of n for (int i=3; i * i <=n; i +=2) { if (n % i==0) { return false; // Divisible, so not prime }
    } return true; // Not divisible by any number, so it's prime } public static void main(String[] args) { int num=17;
    if (isPrimeOptimized(num)) { System.out.println(num + " is a prime number." ); } else { System.out.println(num
    + " is not a prime number." ); } num=20; if (isPrimeOptimized(num)) { System.out.println(num + " is a prime number."
    ); } else { System.out.println(num + " is not a prime number." ); } num=999983; //test with a larger number if
    (isPrimeOptimized(num)) { System.out.println(num + " is a prime number." ); } else { System.out.println(num
    + " is not a prime number." ); } } } ``` The `isPrimeOptimized` method is significantly faster for larger numbers
    because it reduces the number of iterations required. Choose the version that best suits your needs in terms of
    readability and performance requirements. For most practical purposes, the optimized version is recommended.
    Remember that for extremely large numbers, even more sophisticated primality tests (like the Miller-Rabin test) are
    necessary for reasonable performance.