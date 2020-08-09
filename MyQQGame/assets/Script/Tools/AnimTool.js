var AnimTool = cc.Class({
    extends: cc.Component,
    
    DOWindow: function(args){
        if(args.window == null){
            console.log("弹窗动画失败，窗口没有找到")
            return;
        }
        
        cc.Tween.stopAllByTarget(args.window);
        args.oriSize = args.oriSize || 0;
        args.duration = args.duration || 0.3;
        args.targetSize = args.targetSize || 1;

        args.window.setScale(args.oriSize);
        cc.tween(args.window)
          .to(args.duration, {scale: args.targetSize}, {easing: 'backOut'})
          .call(() => { 
              if(args.endCallBack) 
              args.endCallBack(); 
            })
          .start();
    },

    DOWindowClose: function(args){
        if(args.window == null){
            return;
        }
    
        cc.Tween.stopAllByTarget(args.window);
        args.oriSize = args.oriSize || 1;
        args.duration = args.duration || 0.1;
        args.targetSize = args.targetSize || 0;

        args.window.setScale(args.oriSize);
        cc.tween(args.window)
          .to(args.duration, {scale: args.targetSize})
          .call(() => { 
              if(args.endCallBack) 
              args.endCallBack(); 
            })
          .start();
    },
    
});
module.exports = AnimTool;
