---
# 当前页面内容标题
title: FFmpegの教程
# 分类
category:
  - ffmpeg
# 标签
tag: 
  - ffmpeg
  - 视频转码工具
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 一、参考资料

[通过ffmpeg把图片转换成视频](http://blog.360converter.com/archives/894)  

[FFmpeg命令(一)、使用filter\_complex命令拼接视频](https://blog.csdn.net/Gary__123456/article/details/88742705)  

[FFmpeg 视频处理入门教程](http://www.ruanyifeng.com/blog/2020/01/ffmpeg.html)[给新手的20 多个 FFmpeg 命令示例](https://zhuanlan.zhihu.com/p/67878761)  

[FFmpeg命令行转码](https://blog.csdn.net/Lyman_Ye/article/details/80305904)  

[ffmpeg 翻译文档 (ffmpeg-all 包含重要组件）](https://www.bookstack.cn/read/other-doc-cn-ffmpeg/README.md)  

[FFmpeg Filters Documentation](http://ffmpeg.org/ffmpeg-filters.html#drawtext-1)  

[FFmpeg命令行滤镜使用](https://www.shangmayuan.com/a/46d1902c245842e586ddea9b.html)  

[ffmpeg命令行使用nvidia CUDA scaling高速转分辨率转码(libnpp)](https://blog.csdn.net/n66040927/article/details/84525611)  

[FFmpeg—源码编译](https://www.cnblogs.com/carle-09/p/11736390.html)  

[FFmpeg常用命令](https://www.jianshu.com/p/c56d5d79ce8b)  

[Linux上的ffmpeg完全使用指南](https://eyehere.net/2019/the-complete-guide-for-using-ffmpeg-in-linux/)  

[视频和视频帧：FFMPEG 硬件解码API介绍](https://zhuanlan.zhihu.com/p/168240163)

## 二、安装[ffmpeg](https://so.csdn.net/so/search?q=ffmpeg&spm=1001.2101.3001.7020)、ffmpy

### 安装ffmpeg

```
# 更新源
sudo apt update

# 添加源
sudo add-apt-repository ppa:kirillshkrogalev/ffmpeg-next 

# 安装ffmpeg
sudo apt-get install ffmpeg

# 查看版本
ffmpeg -version

# 查看编码器和解码器
ffmpeg -encoders
```

### 安装ffmpy

```
pip install ffmpy==0.2.2   # 需要权限就添加sudo
```

## 三、关键指令

1. 查看FFmpeg支持的编码器

    ```
    ffmpeg configure -encoders
    ```

2. 查看FFmpeg支持的解码器

    ```
    ffmpeg configure -decoders
    ```

3. 查看FFmpeg支持的通信协议

    ```
    ffmpeg configure -protocols
    ```

4. 查看FFmpeg所支持的音视频编码格式、文件封装格式与流媒体传输协议

    ```
    ffmpeg configure --help
    ```

5. 播放视频  
    [FFmpeg命令行工具学习(二)：播放媒体文件的工具ffplay](https://www.cnblogs.com/renhui/p/8458802.html)

    ```
    ffplay input.mp4
    
    # 播放完自动退出
    ffplay -autoexit input.mp4
    ```

6. 设置视频的屏幕高宽比

    ```
    ffmpeg -i input.mp4 -aspect 16:9 output.mp4 
    ```

    ```
    通常使用的宽高比是：
    16:9
    4:3
    16:10
    5:4
    2:21:1
    2:35:1
    2:39:1
    ```

7. 编码格式转换

    MPEG4编码转成H264编码

    ```
    ffmpeg -i input.mp4 -strict -2 -vcodec h264 output.mp4
    ```

    H264编码转成MPEG4编码

    ```
    ffmpeg -i input.mp4 -strict -2 -vcodec mpeg4 output.mp4
    ```

## 四、视频压缩

```
ffmpeg -i 2020.mp4 -vcodec h264 -vf scale=640:-2 -threads 4 2020_conv.mp4

ffmpeg -i 1579251906.mp4 -strict -2 -vcodec h264 1579251906_output.mp4
```

参数解释:

```
-i 2020.mp4
输入文件，源文件

2020_conv.mp4
输出文件，目标文件

-vf scale=640:-2  
改变视频分辨率，缩放到640px宽，高度的-2是考虑到libx264要求高度是偶数，所以设置成-2,让软件自动计算得出一个接近等比例的偶数高

-threads 4
4核运算
```

其他参数：

```
-s 1280x720 
设置输出文件的分辨率，w*h。

-b:v 
输出文件的码率，一般500k左右即可，人眼看不到明显的闪烁，这个是与视频大小最直接相关的。

-preset
指定输出的视频质量，会影响文件的生成速度，有以下几个可用的值 ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow。
与 veryslow相比，placebo以极高的编码时间为代价，只换取了大概1%的视频质量提升。这是一种收益递减准则：slow 与 medium相比提升了5%~10%；slower 与 slow相比提升了5%；veryslow 与 slower相比提升了3%。
针对特定类型的源内容（比如电影、动画等），还可以使用-tune参数进行特别的优化。

-an
去除音频流。

-vn
去除视频流。

-c:a
指定音频编码器。

-c:v
指定视频编码器，libx264，libx265，H.262，H.264，H.265。
libx264：最流行的开源 H.264 编码器。
NVENC：基于 NVIDIA GPU 的 H.264 编码器。
libx265：开源的 HEVC 编码器。
libvpx：谷歌的 VP8 和 VP9 编码器。
libaom：AV1 编码器。

-vcodec copy
表示不重新编码，在格式未改变的情况采用。

-re 
以源文件固有帧率发送数据。

-minrate 964K -maxrate 3856K -bufsize 2000K 
指定码率最小为964K，最大为3856K，缓冲区大小为 2000K。

-y
不经过确认，输出时直接覆盖同名文件。

-crf
参数来控制转码，取值范围为 0~51，其中0为无损模式，18~28是一个合理的范围，数值越大，画质越差。
```

## 五、视频拼接

1. 将4个视频拼接成一个很长的视频（无声音）

    ```
    ffmpeg -i 0.mp4 -i 1.mp4 -i 2.mp4 -i 3.mp4 -filter_complex '[0:0][1:0] [2:0][3:0] concat=n=4:v=1 [v]' -map '[v]' output.mp4
    ```

2. 将4个视频拼接成一个很长的视频（有声音）

    ```
    ffmpeg -i 1.mp4 -i 2.mp4 -i 3.mp4 -filter_complex '[0:0][0:1] [1:0][1:1] [2:0][2:1] concat=n=3:v=1:a=1 [v][a]' -map '[v]' -map '[a]’  output.mp4
    ```

    参数解释：

    ```
    [0:0][0:1] [1:0][1:1] [2:0][2:1] 
    分别表示第1个输入文件的视频、音频，第2个输入文件的视频、音频，第3个输入文件的视频、音频。
    
    concat=n=3:v=1:a=1 
    表示有3个输入文件，输出一条视频流和一条音频流。
    
    [v][a] 
    得到的视频流和音频流的名字，注意在 bash 等 shell 中需要用引号，防止通配符扩展。
    ```

3. 横向拼接2个视频

    ```
    ffmpeg -i 0.mp4 -i 1.mp4 -filter_complex "[0:v]pad=iw*2:ih*1[a];[a][1:v]overlay=w" out.mp4
    ```

    参数解释：

    ```
    pad
    将合成的视频宽高，这里iw代表第1个视频的宽，iw*2代表合成后的视频宽度加倍，ih为第1个视频的高，合成的两个视频最好分辨率一致。
    
    overlay
    覆盖，[a][1:v]overlay=w，后面代表是覆盖位置w:0。
    ```

4. 竖向拼接2个视频

    ```
    ffmpeg -i 0.mp4 -i 1.mp4 -filter_complex "[0:v]pad=iw:ih*2[a];[a][1:v]overlay=0:h" out_2.mp4
    ```

5. 横向拼接3个视频

    ```
    ffmpeg -i 0.mp4 -i 1.mp4 -i 2.mp4 -filter_complex "[0:v]pad=iw*3:ih*1[a];[a][1:v]overlay=w[b];[b][2:v]overlay=2.0*w" out_v3.mp4
    ```

6. 竖向拼接3个视频

    ```
    ffmpeg -i 0.mp4 -i 1.mp4 -i 2.mp4 -filter_complex "[0:v]pad=iw:ih*3[a];[a][1:v]overlay=0:h[b];[b][2:v]overlay=0:2.0*h" out_v4.mp4
    ```

7. 4个视频2x2方式排列

    ```
    ffmpeg -i 0.mp4 -i 1.mp4 -i 2.mp4 -i 3.mp4 -filter_complex "[0:v]pad=iw*2:ih*2[a];[a][1:v]overlay=w[b];[b][2:v]overlay=0:h[c];[c][3:v]overlay=w:h" out.mp4
    ```

## 六、视频帧操作

[ffmpeg和H264视频的编解码](https://zhuanlan.zhihu.com/p/36109778)

1. 查看每帧的信息

    ```
    ffprobe -v error -show_frames gemfield.mp4 
    ```

    从pict\_type=I可以看出这是个关键帧，然后key\_frame=1 表示这是IDR frame，如果key\_frame=0表示这是Non-IDR frame。

2. 截取视频中的某一帧

    把gemfield.mp4视频的第1分05秒的一帧图像截取出来。

    ```
    # input seeking
    ffmpeg -ss 00:1:05 -i gemfield.mp4 -frames:v 1 out.jpg
    ```

    ```
    # output seeking
    ffmpeg -i gemfield.mp4 -ss 00:1:05 -frames:v 1 out1.jpg
    ```

    参数解释：

    ```
    -frame:v 1，在video stream上截取1帧。
    input seeking使用的是key frames，所以速度很快；而output seeking是逐帧decode，直到1分05秒，所以速度很慢。
    ```

    重要说明：

    ```
    ffmpeg截取视频帧有2种 seeking 方式，对应有2种 coding 模式：transcoding 和 stream copying（ffmpeg -c copy）。
    
    transcoding 模式：需要 decoding + encoding 的模式，即先 decoding 再encoding。
    
    stream copying 模式：不需要decoding + encoding的模式，由命令行选项-codec加上参数copy来指定（-c:v copy ）。在这种模式下，ffmpeg在video stream上就会忽略 decoding 和 encoding步骤。
    ```

3. 查看视频总帧数

    ```
    ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_frames -of default=nokey=1:noprint_wrappers=1 gemfield.mp4
    ```

4. 查看 key frame 帧数

    ```
    ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 -skip_frame nokey gemfield.mp4
    ```

5. 查看 key frame 所在的时间

    ```
    ffprobe -v error -skip_frame nokey -select_streams v:0 -show_entries frame=pkt_pts_time -of csv=print_section=0 gemfield.mp4
    ```

6. 查看 key frame 分布的情况

    ```
    ffprobe -v error -show_frames gemfield.mp4 | grep pict_type
    ```

7. 查看 key frame 所在的帧数

    ```
    ffprobe -v error -select_streams v -show_frames -show_entries frame=pict_type -of csv gemfield.mp4 | grep -n I | cut -d ':' -f 1
    ```

8. 重新设置 key frame interval

    ```
    ffmpeg -i gemfield.mp4 -vcodec libx264 -x264-params keyint=1:scenecut=0 -acodec copy out.mp4
    ```

9. 查看视频波特率

    ```
    ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 gemfield.mp4
    ```

## 七、图片与视频

### 7.1 图片转视频（规则的名称）

```
ffmpeg -f image2 -i 'in%6d.jpg' -vcodec libx264 -r 25 -b 200k test.mp4
```

参数解释：

```
-r 25 表示每秒播放25帧
-b 200k 指定码率为200k

图片的文件名为"in000000.jpg"，从0开始依次递增。
```

### 7.2 图片转视频（不规则的名称）

不规则图片名称转视频。

#### 7.2.1 方法一

**不规则图片名称合成视频文件**。

```
ffmpeg -framerate 10 -pattern_type glob -i '*.jpg' out.mp4

cat *.png | ffmpeg -f image2pipe -i - output.mp4

参数解释：
-framerate 10：视频帧率
-pattern_type glob：Glob pattern 模糊匹配
-f image2pipe：图像管道，模糊匹配得到图片名称
```

#### 7.2.2 方法二

**不规则图片名称合成视频文件**。

1. 先动手把不规则文件重命名规则图片名。

```
def getTpyeFile(filelist, type):     
    res = []     
    for item in filelist:
         name, suf = os.path.splitext(item) # 文件名，后缀
         if suf == type:
             res.append(item)
     return res
 
pwd = os.getcwd() # 返回当前目录的绝对路径
dirs = os.listdir() # 当前目录下所有的文件名组成的数组
typefiles = getTpyeFile(dirs, '.jpg')
 
for i in range(0,len(typefiles)):
     os.rename(typefiles[i],"./%d.jpg" % (i)) #将文件以数字规则命令
```

2. 将需要合成的图片放在txt中，通过读取txt文件合并成视频。

```
ffmpeg -f concat -i files.txt output.mp4
```

### 7.3 图片格式转换

[ffmpeg图片格式转换](https://www.cnblogs.com/freedom-try/p/14077613.html)

**webp转换成jpg**

```
ffmpeg -i in.webp out.jpg
```

**webp转换成png**

```
ffmpeg -i in.webp out.png
```

**jpg转换成png**

```
ffmpeg -i in.jpg out.png
```

**jpg转换成webp**

```
ffmpeg -i in.jpg out.webp
```

**png转换成webp**

```
ffmpeg -i in.png out.webp
```

**png转换成jpg**

```
ffmpeg -i in.png out.jpg
```

## 八、硬解码与软解码

1. CPU富余、需要精准控制解码流程、有解码算法的优化、通用性要求高，直接使用软解（也就是CPU解码）;
2. 有其他编解码芯片/模组、CPU不够用，就不得不需要转向硬解码（也就是专用芯片解码）。
