<h1 align="center">POKEMON GENERATOR</h1>  

<p align='center'>
  <img src="client/src/assets/img/pokeball.png" />
</p>

## Have you ever dream about a new Pokemon ?  
Create your own card Pokemon by customizing every details available on first generation cards.  
Like the example below, you will be able to create a card of your favorite hero.
  
<p align='center' style='margin: 20px 0'>
  <img src="client/src/assets/img/markinou.png" />
</p>
  
## How to run ? 🚀

``` bash
# Install dependencies
npm run i

# Start application
npm run dev
```
**NOTE:** The app uses environment vars, you have to rename files .env.sample to .env in both folders server and client, then complete empty vars.

## Services
Pokemon Generator use some external services, and can't works without them.

### Instagram 
Users may upload pictures directly from their Instagram account. The app need to have credentials from Instagram API (pair key <> secret), follow this link to create one : https://www.instagram.com/developer/clients/manage

### Transloadit
Transloadit allows file processing before upload like compression, resizing, conversion, and many more. You can find more details about this service here : https://transloadit.com/

### Amazon S3
After processing files are uploaded on Amazon S3, this is a storage service. I use this service directly in Transloadit, you can set your account to handle uploading on S3 (or use any storage service if you prefer).  
**S3** : https://aws.amazon.com/fr/s3/  
**How to use S3 in Transloadit** : https://transloadit.com/services/file-exporting/s3-store/
