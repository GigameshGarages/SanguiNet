var db;

class OrbitHandler {

  setUp = async () => {
    const IPFS = require('ipfs')
    const OrbitDB = require('orbit-db')

    // Create IPFS instance
    const ipfsOptions = {
      EXPERIMENTAL: {
        pubsub: true
      }
    }
    let ipfs = await IPFS.create(ipfsOptions);

    const orbitdb = await OrbitDB.createInstance(ipfs);
    const options = {
      // Give write access to everyone
      accessController: {
        write: ['*']
      }
    }
    db = await orbitdb.docstore('2-database',options);
    console.log("db address is" + db.address.toString());
    db.load();
  }

  getId = async () =>{
    const id = await db.get ('');
    const putId = id.length + 1;
    return putId;
  }

  putData = async (donor) => {
    donor._id = await this.getId();
    console.log(donor);
    db.put (donor).then ((hash) => {
      console.log (hash);
    })
  }

  getData = async () => {
    const donors = await db.get ('');
    return donors;
  }

}

export default OrbitHandler;