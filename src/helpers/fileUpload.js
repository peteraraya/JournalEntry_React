// archivo que se encarga de la subida del archivo

export const fileUpload = async( file )=>{

    const cloudUrl = 'https://api.cloudinary.com/v1_1/drqle8tn3/upload';

    const formData = new FormData();

    formData.append('upload_preset','react-journal');
    formData.append('file', file);


    try {

        const resp = await fetch( cloudUrl, {
                method: 'POST',
                body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();

            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
        
    } catch (error) {
            console.log(error);
            throw error;
    }

    // retornaremos la url de la imagen
}