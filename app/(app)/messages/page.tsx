"use client";
import { Avatar } from "@/components/UI";

export default function ChatsPage() {
  return (
    <div className="scroller">
      <div style={{ padding: '16px var(--pad) 10px' }}><h1 className="h-md">Chats</h1></div>
      <div className="content">
        <div className="list">
          <div className="li">
            <Avatar name="Joseph Mugisha" color="#3C4460" size={46} />
            <div className="grow">
              <div className="row between"><span className="h-sm">Joseph Mugisha</span><span className="t-xs">10:42</span></div>
              <div className="t-xs">Design files are uploaded for your review 👌</div>
            </div>
          </div>
          <div className="li">
            <Avatar name="Brian Okello" color="#1E7F74" size={46} />
            <div className="grow">
              <div className="row between"><span className="h-sm">Brian Okello</span><span className="t-xs">Yesterday</span></div>
              <div className="t-xs">I will come with the breakers at 9am</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}