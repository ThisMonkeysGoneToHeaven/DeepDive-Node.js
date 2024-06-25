# a basic sayHello function which does not take any arguments

sayHello(){
    echo "Hello, Hello it's good to be back, it's good to be back, Hello, Helloooo";
}

sayHello

# a lil more advanced sayGreeting function which does take a couple arguments

sayGreeting(){
    echo $1, $2!;
}

sayGreeting "Fuck you" "Stacey";

# functions can be unset just like aliases

unset -f sayHello

# calling sayHello again should result in an error 

sayHello