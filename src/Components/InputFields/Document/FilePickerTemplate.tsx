import React, { useState, FC } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { AttachFilePreview } from './AttachFilePreview';
import { Button, FlatList, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RequestModule } from '../../../RequestModule/RequestModule';
import { conversationDAL } from '../../../../App';
import { useReduxDispatch, useReduxSelector } from '../../../AppState/Store';
import { addMessageDraftReferences, sendMessage, updateDraft } from '../../../AppState/MessagingHubState/MessagingHubSlice';
import { IReference } from '../../../AppState/MessagingHubState/Interfaces/IReferenceDetails';
import { ReferenceType } from '../../../AppState/MessagingHubState/Enums/ReferenceType';
import { MessageDetails } from '../../../AppState/MessagingHubState/Interfaces/MessageDetails';
//@ts-ignore
import * as mime from 'react-native-mime-types';

export class FilePickerTemplate {
   async uploadDocument() {
      let result = await DocumentPicker.getDocumentAsync();
      if (result.type === 'success') {
         let formdata = new FormData();
         formdata.append("file", { uri: result.uri, name: result.name, type: mime.lookup(result.uri) });
         return this.send(formdata);
      }
   };

   async uploadMedia() {

      let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, base64: true, exif: true });
      if (!result.cancelled) {
         let formdata = new FormData();
         let filename = result.uri.split('/').pop();
         formdata.append("file", { uri: Platform.OS == 'ios' ? result.uri.replace("file://", "/private") : result.uri, name: filename, type: mime.lookup(result.uri) });
         return this.send(formdata);
      }
   };

   private async send(formData: FormData) {
      let res = await RequestModule.send("/mobile/Attachment/Upload", "POST", formData)
      let response = await res?.json() as IReference[];
      return response;
   }
}




export default FilePickerTemplate;




