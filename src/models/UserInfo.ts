import { Schema, model, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const NotificationSchema = new Schema({
    msg: {
        type: String,
        require: true
    },                            
    //! ES UN JSON CON LA INFORMACIÓN DEL USUARIO -> DANGER
    info_sender: {
        type: String,
        require: false      
    },        
    is_case_especial_case: {
        type: Boolean,
        require: false
    },        
    info_especial_case_name_module: {
        type: String,
        require: false
    },        
    action: {
        type: String,
        require: true
    },        
    complement_action: {
        type: String,
        require: false
    },        
    isView: {
        type: Boolean,
        require: true,
    },        
    isView_date: {
        type: Date,
        require: false,
    },        
    create_at: {
        type: Date,
        require: true
    }
});

const UserInfoSchema = new Schema( {
    id_addressee: {
        type: Number,
        require: true,
        index: true,
        unique: true,
        ref:'PettyCash',
    },
    notifications: [ NotificationSchema ]
});



UserInfoSchema.plugin( mongoosePaginate );
// interface InstitutionDocument extends Document, InstitutionData {}

// export default model< InstitutionDocument, PaginateModel<InstitutionDocument> >( 'UserInfo', UserInfoSchema );
export default model( 'UserInfo', UserInfoSchema );