import { SidebarMobile } from '@/components/sidebar-mobile'
import { SidebarToggle } from '@/components/sidebar-toggle'
import { ChatHistory } from '@/components/chat-history'

export function SideMenu() {
  return (
    <>
      <SidebarMobile>
        {/* <ChatHistory userId={session.user.id} /> */}
        <ChatHistory userId={'user_2gWi8ToJSPBRRQmbzjL61JkSLct'} />
      </SidebarMobile>
    </>
  )
}
