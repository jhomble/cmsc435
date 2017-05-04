import sys
# sys.path.extend(['./copct-master','./dananau-pyhop-195ab6320571'])
import math


def toXML(state, xml_file_path, tabletop_xspan, tabletop_yspan, layout_xspan, layout_yspan, dims):
    layout_xcoord = str(((layout_xspan/2)+1)*-1)
    layout_ycoord = str(0)
    #print 'xcoord', layout_xcoord
    #print 'ycoord', layout_ycoord
    with open(xml_file_path,'w') as xml:
        xml.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        xml.write('<tabletop xmlns="http://synapse.cs.umd.edu/tabletop-xml" xspan="%s" yspan="%s">\n' %(str(tabletop_xspan),str(tabletop_yspan)))
        xml.write('<include file="tablesetup/def-room.xml"/>\n')
        xml.write('<instance def="room">\n')
        xml.write('<var name="xspan" value="%s"/>\n'%(str(layout_xspan)))
        xml.write('<var name="yspan" value="%s"/>\n'%(str(layout_yspan)))
        xml.write('<var name="location" value="(%s,%s, 1)"/>\n'%(layout_xcoord, layout_ycoord))
        xml.write('</instance>\n')
        k=0
        #print 'size of x'+ str(len(xspans))
        #print str(xspans[k+1])

        for obj in state:
            #print "my k is: " + str(k)
            if state[obj][0] == 'block':
                #print "my k is: " + str(k)
                #print str(state[obj][0])
                xml.write('<block xspan="%s" yspan="%s" zspan=".5" id="%s" '%(dims[obj][0], dims[obj][1], obj))
                xml.write('location="(%s,%s,%s)" '%tuple(state[obj][1:4]))
                xml.write('rotation="(0,0,%s)" '%state[obj][4])
                xml.write('color="%s"/>\n'%state[obj][5])
            k=k+1
    
        xml.write('</tabletop>\n')


def buildState(state, names, colors, areaX, areaY):
    layoutX = state['room'][1];
    layoutY = state['room'][2];
    halfX = float(layoutX+2);
    halfY = float((layoutY+2)/2);
    #print 'XXXXXX', layoutX
    #print 'YYYYYY', layoutY
    startX = float(0);
    startY = float(0.5);
    z = 0.5;
    numRooms = len(names);
    inputIndex = 0;
    maxY=0;
    maxX=0;
    newX = startX
    newY = startY
    #flipX = 0
    flipY = 0

    #print "halfX: " + str(halfX)
    #print "halfY: " + str(halfY) 
    for i in range(1,numRooms+1):
        startX = newX
        currXSpan = int(areaX[inputIndex])
        currYSpan = int(areaY[inputIndex])
        #if flipX==1:
        	#startX = startX + float(currXSpan/float(2)) + maxX
        	#flipX=0
       	#elif flipX==0:
       	startX = startX + float(currXSpan/float(2))
        if flipY==1:
        	startY = startY + float(currYSpan/float(2)) + maxY
        	flipY=0
        elif flipY==0:
        	startY = 0.5 + float(currYSpan/float(2))
        newX = startX+(currXSpan/float(2))+0.5;
        newY = startY+(currYSpan/float(2))+0.5;
        #print "\n"
        #print "startX: " + str(startX)
        #print "startY: " + str(startY)
        #print "newX: " + str(newX)
        #print "newY: " + str(newY)
        #print "currYSpan/2: " + str(float(currYSpan/2))

        if newY>maxY :
            maxY=newY
        if newX>maxX :
        	maxX=newX
        #print "maxX: " + str(maxX)	
        #print "maxY: " + str(maxY)
        if newX > halfX and newY <= halfY: #x is out of bounds, but y isnt so reset back to intinal X, but move up Y
            startX = 0;
            startY = maxY
            newX=0
            flipY = 1
            #print "x is out of bounds, but y isnt"
            continue
        elif newX<=halfX and newY >halfY:
        	#startY = 0.5;
        	#startX = maxX
        	#newY=0
        	#flipX = 1
        	#print "y is out of bounds, but x isnt"
        	break;
        elif newX > halfX and newY > halfY: # now y is also out of bounds so go to quadrant 
        	#print "both x and y out of bounds"
        	break;
        state[names[inputIndex]] = ['block', startX, startY, z, 0, colors[inputIndex]]
        numRooms = numRooms-1;
        inputIndex = inputIndex + 1
        
        
    startX = float(0);
    startY = float(-0.5);
    newX = startX
    newY = startY
    halfY = float(halfY * -1)
    minX=0
    minY=0
    #flipX=0
    flipY=0
    
    #print "ON OTHER SIDE"
        #print 'numRooms between loops: ', numRooms
        
    for i in range(1,numRooms+1):
    	startX = newX
        currXSpan = int(areaX[inputIndex])
        currYSpan = int(areaY[inputIndex])
        #if flipX==1:
        #	startX = startX + float(currXSpan/float(2)) + maxX
        #	flipX=0
       	#elif flipX==0:
       	startX = startX + float(currXSpan/float(2))
        if flipY==1:
        	startY = startY - float(currYSpan/float(2)) + minY
        	flipY=0
        elif flipY==0:
        	startY = -0.5 - float(currYSpan/float(2))
        
        newX = startX+(currXSpan/float(2))+0.5;
        newY = (startY-(currYSpan/float(2)))-0.5;
        #print "\n"
        #print "currX: " + str(currXSpan)
        #print "currY: " + str(currYSpan)
        #print "startX: " + str(startX)
        #print "startY: " + str(startY)
        #print "newX: " + str(newX)
        #print "newY: " + str(newY)
        
        if newY<minY :
            minY=newY
        if newX<minX :
            minX=newX    
        if newX > halfX and newY >= halfY:
            startX = 0;
            startY = minY;
            newX=0
            flipX=1
            #print "x is out of bounds, but y isnt"
            continue
        elif newX<=halfX and newY<halfY:
        	#startY = -0.5;
        	#startX = maxX
        	#newY=0
        	#flipY = 1
        	#print "y is out of bounds, but x isnt"
        	break;
        elif newX > halfX and newY < halfY:
        	#print "both x and y out of bounds"
        	break;
        
        state[names[inputIndex]] = ['block', startX, startY, z, 0, colors[inputIndex]]
        numRooms = numRooms-1;  
        inputIndex = inputIndex + 1      
    
    return state;


if __name__ == '__main__':
    
    # Infer intentions from demo
    #demo = load_demo(demo_directory='./SMILE-1.1.0/room_demo/')
    
    if sys.argv>1:
        for arg in sys.argv:
            setupStr = arg;
    
    roomBuilder = {}
    rooms = setupStr.split(':')
    destFilename = rooms[-1]
    k = 0
    state = {}
    areaNamesArr = []
    areaColorsArr = []
    areaXSpanArr = []
    areaYSpanArr = []
    dims = {}
    mainRoomArr = rooms[0].split(",") # [room, xspan, yspan]
    state['room'] = [mainRoomArr[0], float(mainRoomArr[1]), float(mainRoomArr[2])]
    i = 1;
    while i < len(rooms)-1:
        roomBuilder[k] = rooms[i].split(',') # 0: [paintRoom,4000,blue]
        areaNamesArr.append(roomBuilder[k][0])
        areaColorsArr.append(roomBuilder[k][1])
        areaXSpanArr.append(roomBuilder[k][2])
        areaYSpanArr.append(roomBuilder[k][3])
        dims[roomBuilder[k][0]] = [roomBuilder[k][2], roomBuilder[k][3]]
        i=i+1

    finalState = {}
    finalState = buildState(state, areaNamesArr, areaColorsArr, areaXSpanArr, areaYSpanArr)
    #print "here"
    #for key in state:
        #print key, state[key]

    layoutX = state['room'][1];
    layoutY = state['room'][2];
    tabletopX = (layoutX+2)	*2;
    tabletopY = (layoutY+2);
    
    # export to xml for smile viewing
    toXML(state,destFilename, tabletopX, tabletopY, layoutX, layoutY, dims)


