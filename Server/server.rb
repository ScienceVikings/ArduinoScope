
require 'bundler/setup'

require 'eventmachine'
require 'em-websocket'
require 'rubyserial'

#ser = Serial.new 'COM21', 9600
#ser.read(!BYTES!)

puts 'Running Arduino Scope Server'

EM.run {

  EM::WebSocket.run(:host => "0.0.0.0", :port => 9090) do |ws|

    serial = nil
    poll = nil

    ws.onopen { |handshake|
      puts 'Client connected'
    }

    ws.onclose {
      puts 'Connection closed'
    }

    ws.onmessage { |msg|
      serial = Serial.new msg, 9600
    }

    poll = proc {

      if serial

        str = serial.gets.encode('UTF-8')
        if str && str != ''
          ws.send(str.chomp!)
        end

      end
      EM.next_tick(poll)
    }

    poll.call

  end

}