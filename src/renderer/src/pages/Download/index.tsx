import { Page } from "@renderer/components/Page"
import { Button, Form, Input, Upload } from "antd"



const Download = () => {
  async function pickDirectory() {
    const ipcHandle = () => window.electron.ipcRenderer.send('test')
    ipcHandle()
    }
  return (
    <Page>
      <div className="bg-fuchsia-300 h-5">Download</div>
      <Form layout="vertical">
        <Form.Item label='链接' fieldId="targetUrl">
          <Input placeholder="请输入下载链接" />
        </Form.Item>
        {/* <Form.Item label='保存路径' fieldId="savePath">
       
    
 
        </Form.Item> */}
      </Form>
      <Button onClick={()=>{
pickDirectory()
}}>Upload Directory 111</Button>
    </Page>
  )
}
export default Download