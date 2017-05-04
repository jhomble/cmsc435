import sys
# sys.path.extend(['./copct-master','./dananau-pyhop-195ab6320571'])
import math


def toXML(state, xml_file_path, tabletop_xspan, tabletop_yspan, layout_xspan, layout_yspan):
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
        
        for obj in state:
            if state[obj][0] == 'block':
                xml.write('<block xspan=".5" yspan=".5" zspan=".5" id="%s" '%obj[:-1])
                xml.write('location="(%s,%s,%s)" '%tuple(state[obj][1:4]))
                xml.write('rotation="(0,0,%s)" '%state[obj][4])
                xml.write('color="%s"/>\n'%state[obj][5])
    
        xml.write('</tabletop>\n')


def buildState(state, names, colors, size):
    layoutX = state['room'][1];
    layoutY = state['room'][2];
    halfX = layoutX+2;
    halfY = layoutY+2;
    #print 'XXXXXX', layoutX
    blockDims = {};
    startX = 1;
    startY = 1;
    z = 0.5;
    k = 1;
    towerHeightCounter=1;
    numRooms = len(names);
    inputIndex = -1;
        
    for i in range(1,numRooms+1):
        inputIndex = inputIndex + 1
        for j in range(1,int(size[inputIndex])+1):
            #print 'name ',names[inputIndex]
            #print 'color ',colors[inputIndex]
            state[names[inputIndex]+str(towerHeightCounter)] = ['block', startX, startY, z*towerHeightCounter, 0, colors[inputIndex]]
            blockDims[k] = [startX, startY, z*towerHeightCounter]
            k = k+1                        
            towerHeightCounter = towerHeightCounter + 1;
            if towerHeightCounter>int(size[inputIndex]):
                towerHeightCounter=1;
                break;
        numRooms = numRooms-1;
        k = k + 1;
        startX = startX+1;
                
                #4,3
        if startX >= halfX and startY+1 <= halfY:
            startX = 1;
            startY = startY +1;
            if startY == halfY:
                k = k+1;
                break;
        elif startX+1 > halfX and startY+1 > halfY:
            k = k+1;
            break;
        
    startX = 1;
    startY = -1;
    halfY = halfY * -1;
    towerHeightCounter = 1;
        #print 'numRooms between loops: ', numRooms
        
    for i in range(1,numRooms+1):
        inputIndex = inputIndex + 1
        for j in range(1,towerHeight+1):
            state[names[inputIndex]+str(towerHeightCounter)] = ['block', startX, startY, z*towerHeightCounter, 0, colors[inputIndex]]
            blockDims[k] = [startX, startY, z*towerHeightCounter]
            k = k+1
                        
            towerHeightCounter = towerHeightCounter + 1;
            if towerHeightCounter>towerHeight:
                towerHeightCounter=1;
                break;
        numRooms = numRooms-1;
        k = k + 1;
        startX = startX+1;
        if startX+1 > halfX and startY-1 > halfY:
            startX = 1;
            startY = startY-1;
            if startY+1 == halfY:
                k = k+1;
    
    
        elif startX+1 > halfX and startY-1 < halfY:
            k = k+1;
                
                
    return state;

if __name__ == '__main__':
    
    # Infer intentions from demo
    #demo = load_demo(demo_directory='./SMILE-1.1.0/room_demo/')
    
    if sys.argv>1:
        for arg in sys.argv:
            setupStr = arg;
    
    roomBuilder = {}
    rooms = setupStr.split(':')
    k = 0
    destFilename = rooms[-1]
    state = {}
    roomNamesArr = []
    roomColorsArr = []
    roomSizeArr = []
    mainRoomArr = rooms[0].split(",") # [room, xspan, yspan]
    state['room'] = [mainRoomArr[0], float(mainRoomArr[1]), float(mainRoomArr[2])]
    i = 1;
    while i < len(rooms)-1:
        roomBuilder[k] = rooms[i].split(',') # 0: [paintRoom,4000,blue]
        roomNamesArr.append(roomBuilder[k][0])
        roomColorsArr.append(roomBuilder[k][1])
        roomSizeArr.append(roomBuilder[k][2])
        i=i+1

    finalState = {}
    finalState = buildState(state, roomNamesArr, roomColorsArr, roomSizeArr)
    #for key in state:
        #print key, state[key]

    layoutX = state['room'][1];
    layoutY = state['room'][2];
    tabletopX = (layoutX+2) *2;
    tabletopY = (layoutY+2);
    
    # export to xml for smile viewing
    toXML(state,destFilename, tabletopX, tabletopY, layoutX, layoutY)


