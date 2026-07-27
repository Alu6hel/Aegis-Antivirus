target triple = "aarch64-unknown-linux-android"

declare i32 @puts(ptr)
declare ptr @malloc(i64)


define i32 @main() {
entry:
; WARNING: Unrecognized instruction 'Initialize Android Bridge let jni_env = alloc ( 256'
; WARNING: Unrecognized instruction 'jni_init ( jni_env'
; WARNING: Unrecognized instruction 'Register FileObserver on Download folder register_file_observer ( jni_env'
; WARNING: Unrecognized instruction 'Keep daemon alive in background start_background_service ('
; WARNING: Unrecognized instruction 'Connect to Offline Swarm Network ( 127 . 0 . 0 . 1 : 8081 or local router IP'
; WARNING: Unrecognized instruction 'let payload = alloc ( 128'
; WARNING: Unrecognized instruction 'Write out LLVM IR simulation for network write_json ( "mobile_telemetry.json"'
  ret i32 0
}
