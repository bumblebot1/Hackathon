#include <wiringPi.h>
int main (void)
{
  wiringPiSetup () ;
  pinMode (0, OUTPUT) ;
  digitalWrite (0, HIGH) ; delay (500) ;
  return 0 ;
}
