import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
 // Create a single supabase client for interacting with your database
 const supabase = createClient('https://yicdppmuskaspvvcwhqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpY2RwcG11c2thc3B2dmN3aHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0NDczNDQsImV4cCI6MjAxNjAyMzM0NH0.0xBZia1hA38Tlm9LJB3XzFTxvdXJoBkNeMbe0cy30es');

document.getElementById('register').addEventListener('click', getInsertInfo);

async function getMessageList(){
    const {data, error} =  await supabase
    .from('message_list')
    .select("*");

    const $list = document.getElementById("messageList");
    
    $list.innerHTML = data.map((info, index) => {
        return `<li>
                    <span class="charactor_icon ${info.charactor}">${info.charactor}</span>
                    <span>${info.name}</span>
                    <span>${info.message}</span>
                </li>`
    }).join('');    
}

 function getInsertInfo(){
    const $charactor = document.getElementById('charactor').value;
    const $name = document.getElementById('name').value;
    const $message = document.getElementById('message').value;

    if(!$charactor || !$name || !$message){
        return alert("정보를 입력해주세요!");
    }

    insertMessage($charactor, $name, $message);
}

async function insertMessage($charactor, $name, $message){
    const {data,error} = await supabase
    .from('message_list')
    .upsert({ 
        charactor: $charactor, 
        name: $name,
        message : $message,
        // registerDate : new Date().getTime()
    })
    .select()

    if(error){
        return alert("에러");
    }

    getMessageList();
}

getMessageList();