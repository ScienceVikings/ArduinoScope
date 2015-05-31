# ArduinoScope
A browser based "oscilloscope" based on arduino's analog to digital conversion inputs

Please note that the arduino analog input goes between 0 and 5 volts, at least with the way the arduino sketch is written.

Upload the Arduino.ino sketch onto your arduino.
bundle install the required ruby gems to get the data from the arduino
Open up view.html, set your serial path and see the real time voltage flow!

This project uses event machine and em-websockets along with rubyserial gems to read data from the arduino in the server 
and push it to the client in real time.
