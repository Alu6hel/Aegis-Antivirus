mod android_jni;
mod windows_sys;
mod daemon;

fn main() {
    println!("Aegis AV Starting...");
    let daemon = daemon::AegisDaemon::new();
    daemon.start();
}
