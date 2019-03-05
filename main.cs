using System;

public class Employee{
    private const int wheelCount= 2
    private const string name;

    public Employee(string name){
        this.name = name;
    }

    static void main(string[] args){
        Employee emp = new Employee("Mario");
    }
}