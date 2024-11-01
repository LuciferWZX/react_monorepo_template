import WKSDK, { Channel, ChannelInfo, ChannelTypePerson } from "wukongimjssdk";
import { APIManager } from "@/instances";
import { Convert } from "@/lib/convert.ts";
import { Buffer } from "buffer";
import { ResponseCode } from "@/types";
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}
export function initDatasource() {
  WKSDK.shared().config.provider.syncConversationsCallback = async () => {
    const uid = WKSDK.shared().config.uid;
    if (!uid) {
      throw new Error("用户id不存在");
    }
    const response = await APIManager.wuKongService.syncConversation({
      uid: uid,
      msg_count: 20,
      version: 0,
    });
    return response.map((res) => {
      return Convert.convert.toConversation(res);
    });
  };

  WKSDK.shared().config.provider.channelInfoCallback = async (
    channel: Channel,
  ) => {
    // 这里仅做演示，实际应该是请求自己业务端的接口，然后返回自己业务端的频道信息，然后填充ChannelInfo,这样在UI的各处就可以很容易的获取到频道的业务信息
    // if (channel.channelType === ChannelTypePerson) {
    //   const infoRes = await getChannelInfo(channel.channelID);
    //   if (infoRes.code === 0 && infoRes.data) {
    //     const channelInfo: ChannelInfo = {
    //       title: infoRes.data.title,
    //       logo: infoRes.data.logo || '',
    //       mute: infoRes.data.mute, // 是否免打扰
    //       top: infoRes.data.top, // 是否置顶
    //       orgData: infoRes.data.orgData ?? {},
    //       online: infoRes.data.online, // 是否在线
    //       lastOffline: infoRes.data.lastOffline, // 最后离线时间
    //       channel: channel,
    //     };
    //     return channelInfo;
    //   }
    // }
    //
    // const infoRes = await getChannelInfo(channel.channelID);
    // if (infoRes) {
    //   await WKSDK.shared().channelManager.syncSubscribes(channel);
    // }
    // const channelInfo: ChannelInfo = {
    //   title: infoRes?.data?.title,
    //   logo: infoRes?.data?.logo,
    //   // `https://api.multiavatar.com/${channel.channelID}.png`,
    //   mute: infoRes?.data?.mute, // 是否免打扰
    //   top: infoRes?.data?.top, // 是否置顶
    //   orgData: infoRes?.data?.orgData ?? {}, // 自己独有的业务数据可以放到这里
    //   online: infoRes?.data?.online, // 是否在线
    //   lastOffline: infoRes?.data?.lastOffline, // 最后离线时间
    //   channel: channel,
    // };
    // return channelInfo;
    const info: ChannelInfo = {
      title: channel.channelID,
      channel: channel,
      logo: "",
      mute: false,
      top: false,
      orgData: undefined,
      online: false,
      lastOffline: 0,
    };
    if (channel.channelType === ChannelTypePerson) {
      const response = await APIManager.userService.getUserSimpleInfo(
        channel.channelID,
      );
      if (response.code === ResponseCode.success) {
        const user = response.data;
        if (user) {
          info.logo = user.avatar;
          info.title = user.nickname;
          info.orgData = user;
        }
      }
    }

    return info;
  };
}
