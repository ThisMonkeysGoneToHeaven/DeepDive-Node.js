#include<stdio.h>
#include<unistd.h>

int main(int argc, char *argv[]){

    for(int i = 0; i < argc; i++){
        printf("argv number %d is: %s\n", i, argv[i]);
    }

    printf("C-Process's PID is: %d\n", getpid());
    printf("C-Process's PPID is: %d\n", getppid());

    return 0;
}