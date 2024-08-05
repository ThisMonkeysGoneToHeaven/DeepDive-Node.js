#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>

int main(int argc, char *argv[]){

    fprintf(stdout, "some text for the stdout -> coming from the c-app \n");
    fprintf(stderr, "some text for the stderr -> coming from the c-app \n");

    return 0;
}