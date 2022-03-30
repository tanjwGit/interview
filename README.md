# interview

master 分支已设置为 `保护分支`, 直接 `push origin master` 会失败，
正确做法为: 
* 建立一个新分支， `push` 后执行 `merge request`;
* `merge request` 时需要邀请至少一个管理员 `cr` 代码， 通过后才可以合并到 `master` 分支；
*  `merged master` 后会自动删除开发分支；
