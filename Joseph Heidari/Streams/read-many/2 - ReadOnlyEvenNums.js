const fs = require("fs/promises");

async function readOnlyEvenNumsUsingStreams(){   
    /** Reading from the source file using a read stream **/

    const fileHandleRead = await fs.open("source.txt", "r");
    // below is the default HighWatermark value for the read-stream.
    const readStream = fileHandleRead.createReadStream({ highWaterMark: 64 * 1024 });

    /** Writing to the destination file using a write stream **/   

    const fileHandleWrite = await fs.open("destination.txt", "w");
    const writeStream = fileHandleWrite.createWriteStream();
    
    /**
        We're going to use the readStream and check for data values and only allow the even values to be written. 

        Now while trying to convert chunks from the readStream into numbers, we run into issues where our numbers might be split into weird places, for example the last element from a chunk might be "2432344" but since computer only understand this as some text being read from a .txt file, the buffer might not contain the complete number with itself. Think about it. Hence, we have made some additions to the code logic below for handling this unintentional anamoly.
    **/

    let splitNum = ''; // this string will contain the splitted-number (if any) so that we can remove it from this chunk and put it at the starting of the next chunk

    readStream.on("data", (chunk) => {
    
        // convert the chunk buffer into a utf-8 string separated by space
        const numbers = chunk.toString('utf-8').split('  ');
        
        // if we have a split issue at the starting of this chunk, let's fix it
        if(Number(numbers[0]) !== Number(numbers[1]) - 1){
            if(splitNum)
                numbers[0] = splitNum.trim() + numbers[0].trim();
        }

        // if we have a split issue at the end of this chunk, let's prepare 'splitNum' for the next chunk
        if(Number(numbers[numbers.length - 2]) + 1 !== Number(numbers[numbers.length - 1])){
            splitNum = numbers.pop();
        }

        // writing even numbers from this chunk
        numbers.forEach((number) => {
            let n = Number(number);
            if(n % 2 == 0){
                if(!writeStream.write(" " + n + " ")){
                    readStream.pause();
                }
            }
        });

    });

    writeStream.on('drain', () => {
        readStream.resume();
    });
};

readOnlyEvenNumsUsingStreams();