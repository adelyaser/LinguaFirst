import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, Users, Phone } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

export default function VideoCallPage() {
  const { callId } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 p-4 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800" asChild>
            <Link to="/student/schedule">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Leave Call
            </Link>
          </Button>
          <div className="text-center">
            <h2 className="text-white font-semibold">Conversation Practice: Daily Routines</h2>
            <p className="text-sm text-gray-400">with Sarah Johnson</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-500 text-white border-0">● LIVE</Badge>
            <span className="text-white text-sm">45:32</span>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="h-full pt-20 pb-24 p-4">
        <div className="h-full max-w-7xl mx-auto relative">
          {/* Teacher Video (Main) */}
          <div className="h-full rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-white font-bold">SJ</span>
              </div>
              <h3 className="text-xl text-white font-semibold">Sarah Johnson</h3>
              <p className="text-gray-400">Teacher</p>
            </div>
          </div>

          {/* Student Video (Picture-in-Picture) */}
          <div className="absolute bottom-4 right-4 w-64 h-48 rounded-lg overflow-hidden bg-gray-700 border-2 border-gray-600">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl text-white font-bold">YOU</span>
                </div>
                {isVideoOff && <p className="text-sm text-white">Camera Off</p>}
              </div>
            </div>
          </div>

          {/* Other Participants (for group classes) */}
          <div className="absolute top-4 right-4 space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-32 h-24 rounded-lg overflow-hidden bg-gray-700 border border-gray-600 flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">S{i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          {/* Microphone */}
          <Button
            size="lg"
            variant={isMuted ? 'destructive' : 'secondary'}
            className="w-14 h-14 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          {/* Camera */}
          <Button
            size="lg"
            variant={isVideoOff ? 'destructive' : 'secondary'}
            className="w-14 h-14 rounded-full"
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </Button>

          {/* Screen Share */}
          <Button size="lg" variant="secondary" className="w-14 h-14 rounded-full">
            <Monitor className="w-6 h-6" />
          </Button>

          {/* Chat */}
          <Button
            size="lg"
            variant="secondary"
            className="w-14 h-14 rounded-full"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          {/* Participants */}
          <Button size="lg" variant="secondary" className="w-14 h-14 rounded-full">
            <Users className="w-6 h-6" />
          </Button>

          {/* Leave Call */}
          <Button
            size="lg"
            variant="destructive"
            className="w-14 h-14 rounded-full ml-4"
            asChild
          >
            <Link to="/student/schedule">
              <Phone className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 z-20">
          <Card className="h-full rounded-none border-0">
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Chat</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                  Close
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                <div className="text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-white font-bold">SJ</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-xs text-gray-600 mb-1">Sarah Johnson</div>
                      <div className="bg-gray-100 rounded-lg p-2">
                        Welcome everyone! Let's start with introductions.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <Button size="sm">Send</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
